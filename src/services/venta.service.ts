import {
  Venta,
  ArticuloVenta,
  Cliente,
  Usuario,
  ProductoCompleto,
  Producto,
  Persona
} from "../models";
import { VentaDTO, VentaConArticulos } from "../interfaces/venta.interface";
import { ArticuloVentaDTO } from "../interfaces/producto_x_venta.interface";
import sequelize from "../config/database";
import { ClienteConPersona, CreateClienteDTO } from "../interfaces/cliente.interface";


const mapClienteToDTO = (cliente: ClienteConPersona): CreateClienteDTO => ({
  cliente: {
    direccion: cliente.direccion,
    activo: cliente.activo,
  },
  persona: {
    nombre: cliente.persona.nombre,
    apellido: cliente.persona.apellido,
    correo: cliente.persona.email,
    telefono: cliente.persona.telefono,
    genero: cliente.persona.genero,
    ciudad: cliente.persona.ciudad,
    edad: cliente.persona.edad,
    id_pais: cliente.persona.id_pais,
  },
});


const mapArticuloVentaToDTO = (articulo: any): ArticuloVentaDTO => ({
  id_axv: articulo.id_axv,
  id_pxc: articulo.id_pxc,
  cantidad_vendida: articulo.cantidad_vendida,
  precio_unitario: Number(articulo.precio_unitario),
  id_venta: articulo.id_venta,
  productoVenta: articulo.productoVenta
    ? {
        id_producto: articulo.productoVenta.id_producto,
        id_talla: articulo.productoVenta.id_talla,
        id_color: articulo.productoVenta.id_color,
        precio: Number(articulo.productoVenta.precio),
        foto: articulo.productoVenta.foto,
        cantidad: articulo.productoVenta.cantidad,
        activo: articulo.productoVenta.activo,
      }
    : undefined,
});

// Mapea una venta Sequelize a DTO
const mapVentaToDTO = (venta: VentaConArticulos): VentaDTO => ({
  id_venta: venta.id_venta,
  id_usuario: venta.id_usuario,
  valor_total: Number(venta.valor_total),
  fecha: venta.fecha,
  articulosVenta: (venta.articulosVenta || []).map(mapArticuloVentaToDTO),
  id_cliente: venta.id_cliente,
  cliente: venta.cliente ? mapClienteToDTO(venta.cliente) : undefined,
});


// Listar todas las ventas
export const getAllVentas = async (): Promise<VentaDTO[]> => {
  try {
    const ventas = (await Venta.findAll({
      include: [
        {
          model: ArticuloVenta,
          as: "articulosVenta",
          include: [
            {
              model: ProductoCompleto,
              as: "productoVenta",
            },
          ],
        },
        { model: Cliente, as: "cliente",  include: [{ model: Persona, as: "persona" }] },
        { model: Usuario, as: "usuario" },
      ],
      order: [["fecha", "DESC"]],
    })) as VentaConArticulos[];

    return ventas.map((venta) => mapVentaToDTO(venta));
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    throw error;
  }
};

// Obtener una venta por ID
export const getVentaById = async (
  id_venta: number
): Promise<VentaDTO | null> => {
  try {
    const venta = (await Venta.findByPk(id_venta, {
      include: [
        {
          model: ArticuloVenta,
          as: "articulosVenta",
          include: [
            {
              model: ProductoCompleto,
              as: "productoVenta",
            },
          ],
        },
        { model: Cliente, as: "cliente" },
        { model: Usuario, as: "usuario" },
      ],
    })) as VentaConArticulos | null;

    if (!venta) return null;
    return mapVentaToDTO(venta);
  } catch (error) {
    console.error("Error al obtener la venta por ID:", error);
    throw error;
  }
};

// Crear una venta con sus artículos y actualizar stock
export const createVenta = async (data: {
  id_cliente: string;
  id_usuario: string;
  fecha: Date;
  articulosVenta: { id_pxc: number; cantidad_vendida: number }[];
}): Promise<VentaDTO> => {
  const transaction = await sequelize.transaction();
  try {
    let valor_total = 0;

    // Crear la venta inicialmente con valor_total = 0
    const nuevaVenta = await Venta.create(
      {
        id_cliente: data.id_cliente,
        id_usuario: data.id_usuario,
        valor_total: 0,
        fecha: data.fecha,
      },
      { transaction }
    );

    // Crear los artículos y actualizar stock
    for (const articulo of data.articulosVenta) {
      const productoCompleto = await ProductoCompleto.findByPk(
        articulo.id_pxc,
        { transaction }
      );
      if (!productoCompleto)
        throw new Error(`ProductoCompleto ${articulo.id_pxc} no encontrado`);

      // Validar stock suficiente
      if (productoCompleto.cantidad < articulo.cantidad_vendida) {
        throw new Error(
          `Stock insuficiente para el producto ${articulo.id_pxc}`
        );
      }

      const precio_unitario = Number(productoCompleto.precio);
      const subtotal = precio_unitario * articulo.cantidad_vendida;
      valor_total += subtotal;

      // Crear ArticuloVenta
      await ArticuloVenta.create(
        {
          id_venta: nuevaVenta.id_venta,
          id_pxc: articulo.id_pxc,
          cantidad_vendida: articulo.cantidad_vendida,
          precio_unitario,
        },
        { transaction }
      );

      // Actualizar stock en ProductoCompleto
      await productoCompleto.update(
        { cantidad: productoCompleto.cantidad - articulo.cantidad_vendida },
        { transaction }
      );

      // Actualizar stock en Producto
      const producto = await Producto.findByPk(productoCompleto.id_producto, {
        transaction,
      });
      if (producto) {
        await producto.update(
          {
            cantidad_stock: producto.cantidad_stock - articulo.cantidad_vendida,
          },
          { transaction }
        );
      }
    }

    // Actualizar valor_total de la venta
    await nuevaVenta.update({ valor_total }, { transaction });

    await transaction.commit();
    return (await getVentaById(nuevaVenta.id_venta))!;
  } catch (error) {
    await transaction.rollback();
    console.error("Error al crear venta:", error);
    throw error;
  }
};

// Eliminar una venta y devolver stock
export const deleteVenta = async (
  id_venta: number
): Promise<{ message: string }> => {
  const transaction = await sequelize.transaction();
  try {
    const venta = (await Venta.findByPk(id_venta, {
      include: [{ model: ArticuloVenta, as: "articulosVenta" }],
      transaction,
    })) as VentaConArticulos | null;

    if (!venta) throw new Error("Venta no encontrada");

    // Devolver stock
    for (const articulo of venta.articulosVenta || []) {
      // Actualizar stock en ProductoCompleto
      const productoCompleto = await ProductoCompleto.findByPk(
        articulo.id_pxc,
        { transaction }
      );
      if (!productoCompleto)
        throw new Error(`ProductoCompleto ${articulo.id_pxc} no encontrado`);
      await productoCompleto.update(
        { cantidad: productoCompleto.cantidad + articulo.cantidad_vendida },
        { transaction }
      );

      // Actualizar stock en Producto
      const producto = await Producto.findByPk(productoCompleto.id_producto, {
        transaction,
      });
      if (producto) {
        await producto.update(
          {
            cantidad_stock: producto.cantidad_stock + articulo.cantidad_vendida,
          },
          { transaction }
        );
      }
    }

    // Borrar la venta
    await venta.destroy({ transaction });

    await transaction.commit();
    return { message: `Venta ${id_venta} eliminada correctamente` };
  } catch (error) {
    await transaction.rollback();
    console.error("Error al eliminar venta:", error);
    throw error;
  }
};
