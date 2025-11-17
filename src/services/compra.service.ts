import {
  Compra,
  ArticuloCompra,
  Usuario,
  Proveedor,
  ProductoCompleto,
  Producto,
  Color,
  Talla,
  Persona,
} from "../models";
import { CompraDTO, CompraConArticulos } from "../interfaces/compra.interface";
import { ArticuloCompraDTO } from "../interfaces/producto_x_compra.interface";
import sequelize from "../config/database";
import {ProveedorDTO } from "../interfaces/proveedor.interface";

const mapProveedorToDTO = (proveedor: any): ProveedorDTO => ({
  proveedor: {
    razon_social: proveedor.razon_social,
    marca: proveedor.marca,
  },
  persona: {
    id_persona: proveedor.persona?.id_persona, 
    cedula: proveedor.persona?.cedula,
  },
});


const mapArticuloCompraToDTO = (articulo: any): ArticuloCompraDTO => ({
  id_axc: articulo.id_axc,
  id_pxc: articulo.id_pxc,
  cantidad: articulo.cantidad,
  precio_unitario: Number(articulo.precio_unitario),
  id_compra_inventario: articulo.id_compra_inventario,
  productoCompra: articulo.productoCompra
    ? {
        id_producto: articulo.productoCompra.id_producto,
        id_talla: articulo.productoCompra.id_talla,
        id_color: articulo.productoCompra.id_color,
        precio: Number(articulo.productoCompra.precio),
        foto: articulo.productoCompra.foto,
        cantidad: articulo.productoCompra.cantidad,
        activo: articulo.productoCompra.activo,
      }
    : undefined,
});

const mapCompraToDTO = (compra: CompraConArticulos): CompraDTO => ({
  id_compra_inventario: compra.id_compra_inventario,
  id_proveedor: compra.id_proveedor,
  id_usuario: compra.id_usuario,
  valor_total: Number(compra.valor_total),
  fecha: compra.fecha,
  articulosCompra: (compra.articulosCompra || []).map(mapArticuloCompraToDTO),
  proveedor: compra.proveedor ? mapProveedorToDTO(compra.proveedor) : undefined,
});



// Listar todas las compras
export const getAllCompras = async (): Promise<CompraDTO[]> => {
  try {
    const compras = await Compra.findAll({
      include: [
        {
          model: ArticuloCompra,
          as: "articulosCompra",
          include: [
            {
              model: ProductoCompleto,
              as: "productoCompra", 
            },
          ],
        },
        {
          model: Proveedor,
          as: "proveedor",
          include: [{ model: Persona, as: "persona" }],
        },
        {
          model: Usuario,
          as: "usuario",
          include: [{ model: Persona, as: "persona" }],
        },
      ],
      order: [["fecha", "DESC"]],
    });

    // si aún no ves productoCompra, revisa tu DTO
    return compras.map((compra) => mapCompraToDTO(compra));
  } catch (error) {
    console.error("Error al obtener compras:", error);
    throw error;
  }
};


// Obtener una compra por ID
export const getCompraById = async (
  id_compra_inventario: number
): Promise<CompraDTO | null> => {
  try {
    const compra = (await Compra.findByPk(id_compra_inventario, {
      include: [
        {
          model: ArticuloCompra,
          as: "articulosCompra",
          include: [
            {
              model: ProductoCompleto,
              as: "productoCompra",
            },
          ],
        },
        {
          model: Proveedor,
          as: "proveedor",
          include: [{ model: Persona, as: "persona" }],
        },
        {
          model: Usuario,
          as: "usuario",
          include: [{ model: Persona, as: "persona" }],
        },
      ],
    })) as CompraConArticulos | null;

    if (!compra) return null;
    return mapCompraToDTO(compra);
  } catch (error) {
    console.error("Error al obtener compra por ID:", error);
    throw error;
  }
};


// Crear una compra con sus artículos y actualizar stock
export const createCompra = async (data: {
  id_proveedor: string;
  id_usuario: string;
  fecha: Date;
  articulosCompra: { id_pxc: number; cantidad: number }[];
}): Promise<CompraDTO> => {
  const transaction = await sequelize.transaction();
  try {
    let valor_total = 0;

    // Crear la compra inicialmente con valor_total = 0
    const nuevaCompra = await Compra.create(
      {
        id_proveedor: data.id_proveedor,
        id_usuario: data.id_usuario,
        valor_total: 0,
        fecha: data.fecha,
      },
      { transaction }
    );

    // Crear artículos y actualizar stock
    for (const articulo of data.articulosCompra) {
      const productoCompleto = await ProductoCompleto.findByPk(articulo.id_pxc, { transaction });
      if (!productoCompleto)
        throw new Error(`ProductoCompleto ${articulo.id_pxc} no encontrado`);

      // Tomar el precio desde ProductoCompleto
      const precio_unitario = Number(productoCompleto.precio);
      const subtotal = precio_unitario * articulo.cantidad;
      valor_total += subtotal;

      // Crear ArticuloCompra
      await ArticuloCompra.create(
        {
          id_compra_inventario: nuevaCompra.id_compra_inventario,
          id_pxc: articulo.id_pxc,
          cantidad: articulo.cantidad,
          precio_unitario,
        },
        { transaction }
      );

      // Actualizar stock en ProductoCompleto (se suma al stock)
      await productoCompleto.update(
        { cantidad: productoCompleto.cantidad + articulo.cantidad },
        { transaction }
      );

      // Actualizar stock en Producto
      const producto = await Producto.findByPk(productoCompleto.id_producto, { transaction });
      if (producto) {
        await producto.update(
          { cantidad_stock: producto.cantidad_stock + articulo.cantidad },
          { transaction }
        );
      }
    }

    // Actualizar valor_total
    await nuevaCompra.update({ valor_total }, { transaction });

    await transaction.commit();
    return (await getCompraById(nuevaCompra.id_compra_inventario))!;
  } catch (error) {
    await transaction.rollback();
    console.error("Error al crear compra:", error);
    throw error;
  }
};


// Eliminar compra y restar stock
export const deleteCompra = async (
  id_compra_inventario: number
): Promise<{ message: string }> => {
  const transaction = await sequelize.transaction();
  try {
    const compra = (await Compra.findByPk(id_compra_inventario, {
      include: [{ model: ArticuloCompra, as: "articulosCompra" }],
      transaction,
    })) as CompraConArticulos | null;

    if (!compra) throw new Error("Compra no encontrada");

    // Restar stock (reversar la compra)
    for (const articulo of compra.articulosCompra || []) {
      const productoCompleto = await ProductoCompleto.findByPk(articulo.id_pxc, { transaction });
      if (!productoCompleto)
        throw new Error(`ProductoCompleto ${articulo.id_pxc} no encontrado`);

      await productoCompleto.update(
        { cantidad: productoCompleto.cantidad - articulo.cantidad },
        { transaction }
      );

      const producto = await Producto.findByPk(productoCompleto.id_producto, { transaction });
      if (producto) {
        await producto.update(
          { cantidad_stock: producto.cantidad_stock - articulo.cantidad },
          { transaction }
        );
      }
    }

    // Borrar compra
    await compra.destroy({ transaction });

    await transaction.commit();
    return { message: `Compra ${id_compra_inventario} eliminada correctamente` };
  } catch (error) {
    await transaction.rollback();
    console.error("Error al eliminar compra:", error);
    throw error;
  }
};
