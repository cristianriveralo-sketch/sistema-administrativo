import { ArticuloCompra, ProductoCompleto, Compra, Producto } from "../models";
import { ArticuloCompraDTO } from "../interfaces/producto_x_compra.interface";
import sequelize from "../config/database";

// Mapper DTO
const mapArticuloCompraToDTO = (articulo: ArticuloCompra): ArticuloCompraDTO => ({
  id_axc: articulo.id_axc,
  id_compra_inventario: articulo.id_compra_inventario,
  id_pxc: articulo.id_pxc,
  cantidad: articulo.cantidad,
  precio_unitario: Number(articulo.precio_unitario),
  productoCompra: articulo.productoCompra && {
    id_producto: articulo.productoCompra.id_producto,
    id_talla: articulo.productoCompra.id_talla,
    id_color: articulo.productoCompra.id_color,
    precio: Number(articulo.productoCompra.precio),
    foto: articulo.productoCompra.foto,
    cantidad: articulo.productoCompra.cantidad,
    activo: articulo.productoCompra.activo,
  },
});

// Recalcular valor_total de la compra
const recalcularValorTotal = async (id_compra_inventario: number, transaction: any) => {
  const articulos = await ArticuloCompra.findAll({
    where: { id_compra_inventario },
    transaction,
  });

  const valor_total = articulos.reduce(
    (sum, a) => sum + Number(a.cantidad) * Number(a.precio_unitario),
    0
  );

  await Compra.update(
    { valor_total },
    { where: { id_compra_inventario }, transaction }
  );
};

// Listar todos los artículos de una compra
export const getArticulosByCompra = async (
  id_compra_inventario: number
): Promise<ArticuloCompraDTO[]> => {
  const articulos = await ArticuloCompra.findAll({
    where: { id_compra_inventario },
    include: [{ model: ProductoCompleto, as: "productoCompra" }],
  });
  return articulos.map(mapArticuloCompraToDTO);
};

// Obtener todos los id_axc de una compra
export const getIdsAxCByCompra = async (id_compra_inventario: number): Promise<number[]> => {
  const articulos = await ArticuloCompra.findAll({
    where: { id_compra_inventario },
    attributes: ["id_axc"],
  });
  return articulos.map((a) => a.id_axc);
};

// Obtener un artículo por ID
export const getArticuloCompraById = async (
  id_axc: number
): Promise<ArticuloCompraDTO | null> => {
  const articulo = await ArticuloCompra.findByPk(id_axc, {
    include: [{ model: ProductoCompleto, as: "productoCompra" }],
  });
  return articulo ? mapArticuloCompraToDTO(articulo) : null;
};

// Crear un artículo en una compra
export const createArticuloCompra = async (
  data: Omit<ArticuloCompraDTO, "id_axc">
): Promise<ArticuloCompraDTO> => {
  const transaction = await sequelize.transaction();
  try {
    const productoCompleto = await ProductoCompleto.findByPk(data.id_pxc, { transaction });
    if (!productoCompleto) throw new Error("ProductoCompleto no encontrado");

    const nuevoArticulo = await ArticuloCompra.create(
      {
        id_compra_inventario: data.id_compra_inventario,
        id_pxc: data.id_pxc,
        cantidad: data.cantidad,
        precio_unitario: productoCompleto.precio,
      },
      { transaction }
    );

    // Aumentar stock en ProductoCompleto
    await productoCompleto.update(
      { cantidad: productoCompleto.cantidad + data.cantidad },
      { transaction }
    );

    // Aumentar stock en Producto (usando id_producto del productoCompleto)
    const producto = await Producto.findByPk(productoCompleto.id_producto, { transaction });
    if (producto) {
      await producto.update(
        { cantidad_stock: producto.cantidad_stock + data.cantidad },
        { transaction }
      );
    }

    // Recalcular valor total
    await recalcularValorTotal(data.id_compra_inventario, transaction);

    await transaction.commit();
    return mapArticuloCompraToDTO(nuevoArticulo);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};


// Actualizar un artículo de compra
export const updateArticuloCompra = async (
  id_axc: number,
  data: Partial<Omit<ArticuloCompraDTO, "id_axc" | "precio_unitario">>
): Promise<ArticuloCompraDTO | null> => {
  const transaction = await sequelize.transaction();
  try {
    const articulo = await ArticuloCompra.findByPk(id_axc, { transaction });
    if (!articulo) return null;

    // Revertir stock anterior en ProductoCompleto
    const productoAnteriorCompleto = await ProductoCompleto.findByPk(articulo.id_pxc, { transaction });
    if (!productoAnteriorCompleto) throw new Error("ProductoCompleto anterior no encontrado");

    await productoAnteriorCompleto.update(
      { cantidad: productoAnteriorCompleto.cantidad - articulo.cantidad },
      { transaction }
    );

    // Revertir stock anterior en Producto
    const productoAnterior = await Producto.findByPk(productoAnteriorCompleto.id_producto, { transaction });
    if (productoAnterior) {
      await productoAnterior.update(
        { cantidad_stock: productoAnterior.cantidad_stock - articulo.cantidad },
        { transaction }
      );
    }

    // Buscar producto nuevo (si cambia id_pxc, usarlo)
    const productoNuevoCompleto = await ProductoCompleto.findByPk(data.id_pxc ?? articulo.id_pxc, { transaction });
    if (!productoNuevoCompleto) throw new Error("ProductoCompleto nuevo no encontrado");

    const nuevaCantidad = data.cantidad ?? articulo.cantidad;

    // Actualizar artículo
    await articulo.update(
      {
        ...data,
        cantidad: nuevaCantidad,
        precio_unitario: productoNuevoCompleto.precio,
      },
      { transaction }
    );

    // Aumentar stock en ProductoCompleto
    await productoNuevoCompleto.update(
      { cantidad: productoNuevoCompleto.cantidad + nuevaCantidad },
      { transaction }
    );

    // Aumentar stock en Producto
    const productoNuevo = await Producto.findByPk(productoNuevoCompleto.id_producto, { transaction });
    if (productoNuevo) {
      await productoNuevo.update(
        { cantidad_stock: productoNuevo.cantidad_stock + nuevaCantidad },
        { transaction }
      );
    }

    // Recalcular valor total
    await recalcularValorTotal(articulo.id_compra_inventario, transaction);

    await transaction.commit();
    return mapArticuloCompraToDTO(articulo);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};


// Eliminar un artículo de compra
export const deleteArticuloCompra = async (
  id_axc: number
): Promise<{ message: string }> => {
  const transaction = await sequelize.transaction();
  try {
    const articulo = await ArticuloCompra.findByPk(id_axc, { transaction });
    if (!articulo) throw new Error("Artículo de compra no encontrado");

    // Revertir stock en ProductoCompleto
    const productoCompleto = await ProductoCompleto.findByPk(articulo.id_pxc, { transaction });
    if (productoCompleto) {
      await productoCompleto.update(
        { cantidad: productoCompleto.cantidad - articulo.cantidad },
        { transaction }
      );

      // Revertir stock en Producto
      const producto = await Producto.findByPk(productoCompleto.id_producto, { transaction });
      if (producto) {
        await producto.update(
          { cantidad_stock: producto.cantidad_stock - articulo.cantidad },
          { transaction }
        );
      }
    }

    const id_compra_inventario = articulo.id_compra_inventario;
    await articulo.destroy({ transaction });

    // Recalcular valor total
    await recalcularValorTotal(id_compra_inventario, transaction);

    await transaction.commit();
    return { message: `Artículo de compra ${id_axc} eliminado correctamente` };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
