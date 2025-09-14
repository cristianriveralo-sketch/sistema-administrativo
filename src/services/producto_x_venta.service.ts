import { ArticuloVenta, ProductoCompleto, Venta, Producto } from "../models";
import { ArticuloVentaDTO } from "../interfaces/producto_x_venta.interface";
import sequelize from "../config/database";

// Mapper DTO

const mapArticuloVentaToDTO = (
  articulo: ArticuloVentaDTO
): ArticuloVentaDTO => ({
  id_axv: articulo.id_axv,
  id_venta: articulo.id_venta,
  id_pxc: articulo.id_pxc,
  cantidad_vendida: articulo.cantidad_vendida,
  precio_unitario: Number(articulo.precio_unitario),
  productoVenta: articulo.productoVenta && {
    id_producto: articulo.productoVenta.id_producto,
    id_talla: articulo.productoVenta.id_talla,
    id_color: articulo.productoVenta.id_color,
    precio: Number(articulo.productoVenta.precio),
    foto: articulo.productoVenta.foto,
    cantidad: articulo.productoVenta.cantidad,
    activo: articulo.productoVenta.activo,
  },
});

// Recalcular valor_total de la venta
const recalcularValorTotalVenta = async (id_venta: number, transaction: any) => {
  const articulos = await ArticuloVenta.findAll({
    where: { id_venta },
    transaction,
  });

  const valor_total = articulos.reduce(
    (sum, a) => sum + Number(a.cantidad_vendida) * Number(a.precio_unitario),
    0
  );

  await Venta.update({ valor_total }, { where: { id_venta }, transaction });
};

// Obterner todos los articulos de una venta
export const getArticuloByVenta = async (
  id_venta: number
): Promise<ArticuloVentaDTO[]> => {
  const articulos = await ArticuloVenta.findAll({
    where: { id_venta },
    include: [{ model: ProductoCompleto, as: "productoVenta" }],
  });
  return articulos.map(mapArticuloVentaToDTO);
};


// Obtener un artículo por ID
export const getArticuloVentaById = async (
  id_axv: number
): Promise<ArticuloVentaDTO | null> => {
  const articulo = await ArticuloVenta.findByPk(id_axv, {
    include: [{ model: ProductoCompleto, as: "productoVenta" }],
  });
  return articulo ? mapArticuloVentaToDTO(articulo) : null;
};



// Crear un artículo en una venta
export const createArticuloVenta = async (
  data: Omit<ArticuloVentaDTO, "id_axv">
): Promise<ArticuloVentaDTO> => {
  const transaction = await sequelize.transaction();
  try {
    const productoCompleto = await ProductoCompleto.findByPk(data.id_pxc, { transaction });
    if (!productoCompleto) throw new Error("ProductoCompleto no encontrado");

    // Validar stock suficiente
    if (productoCompleto.cantidad < data.cantidad_vendida) {
      throw new Error("Stock insuficiente para realizar la venta");
    }

    const nuevoArticulo = await ArticuloVenta.create(
      {
        id_venta: data.id_venta,
        id_pxc: data.id_pxc,
        cantidad_vendida: data.cantidad_vendida,
        precio_unitario: productoCompleto.precio,
      },
      { transaction }
    );

    // Disminuir stock en ProductoCompleto
    await productoCompleto.update(
      { cantidad: productoCompleto.cantidad - data.cantidad_vendida },
      { transaction }
    );

    // Disminuir stock en Producto
    const producto = await Producto.findByPk(productoCompleto.id_producto, { transaction });
    if (producto) {
      await producto.update(
        { cantidad_stock: producto.cantidad_stock - data.cantidad_vendida },
        { transaction }
      );
    }

    // Recalcular valor total
    await recalcularValorTotalVenta(data.id_venta, transaction);

    await transaction.commit();
    return mapArticuloVentaToDTO(nuevoArticulo);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// Actualizar un artículo de venta
export const updateArticuloVenta = async (
  id_axv: number,
  data: Partial<Omit<ArticuloVentaDTO, "id_axv" | "precio_unitario">>
): Promise<ArticuloVentaDTO | null> => {
  const transaction = await sequelize.transaction();
  try {
    const articulo = await ArticuloVenta.findByPk(id_axv, { transaction });
    if (!articulo) return null;

    // Revertir stock anterior en ProductoCompleto
    const productoAnteriorCompleto = await ProductoCompleto.findByPk(articulo.id_pxc, { transaction });
    if (!productoAnteriorCompleto) throw new Error("ProductoCompleto anterior no encontrado");

    await productoAnteriorCompleto.update(
      { cantidad: productoAnteriorCompleto.cantidad + articulo.cantidad_vendida },
      { transaction }
    );

    // Revertir stock anterior en Producto
    const productoAnterior = await Producto.findByPk(productoAnteriorCompleto.id_producto, { transaction });
    if (productoAnterior) {
      await productoAnterior.update(
        { cantidad_stock: productoAnterior.cantidad_stock + articulo.cantidad_vendida },
        { transaction }
      );
    }

    // Buscar producto nuevo (si cambia id_pxc, usarlo)
    const productoNuevoCompleto = await ProductoCompleto.findByPk(data.id_pxc ?? articulo.id_pxc, { transaction });
    if (!productoNuevoCompleto) throw new Error("ProductoCompleto nuevo no encontrado");

    const nuevaCantidad = data.cantidad_vendida ?? articulo.cantidad_vendida;

    // Validar stock suficiente
    if (productoNuevoCompleto.cantidad < nuevaCantidad) {
      throw new Error("Stock insuficiente para actualizar la venta");
    }

    // Actualizar artículo
    await articulo.update(
      {
        ...data,
        cantidad_vendida: nuevaCantidad,
        precio_unitario: productoNuevoCompleto.precio,
      },
      { transaction }
    );

    // Disminuir stock en ProductoCompleto
    await productoNuevoCompleto.update(
      { cantidad: productoNuevoCompleto.cantidad - nuevaCantidad },
      { transaction }
    );

    // Disminuir stock en Producto
    const productoNuevo = await Producto.findByPk(productoNuevoCompleto.id_producto, { transaction });
    if (productoNuevo) {
      await productoNuevo.update(
        { cantidad_stock: productoNuevo.cantidad_stock - nuevaCantidad },
        { transaction }
      );
    }

    // Recalcular valor total
    await recalcularValorTotalVenta(articulo.id_venta, transaction);

    await transaction.commit();
    return mapArticuloVentaToDTO(articulo);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// Eliminar un artículo de venta
export const deleteArticuloVenta = async (
  id_axv: number
): Promise<{ message: string }> => {
  const transaction = await sequelize.transaction();
  try {
    const articulo = await ArticuloVenta.findByPk(id_axv, { transaction });
    if (!articulo) throw new Error("Artículo de venta no encontrado");

    // Revertir stock en ProductoCompleto
    const productoCompleto = await ProductoCompleto.findByPk(articulo.id_pxc, { transaction });
    if (productoCompleto) {
      await productoCompleto.update(
        { cantidad: productoCompleto.cantidad + articulo.cantidad_vendida },
        { transaction }
      );

      // Revertir stock en Producto
      const producto = await Producto.findByPk(productoCompleto.id_producto, { transaction });
      if (producto) {
        await producto.update(
          { cantidad_stock: producto.cantidad_stock + articulo.cantidad_vendida },
          { transaction }
        );
      }
    }

    const id_venta = articulo.id_venta;
    await articulo.destroy({ transaction });

    // Recalcular valor total
    await recalcularValorTotalVenta(id_venta, transaction);

    await transaction.commit();
    return { message: `Artículo de venta ${id_axv} eliminado correctamente` };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};