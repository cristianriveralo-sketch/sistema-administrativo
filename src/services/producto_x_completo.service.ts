import { ProductoCompleto, Producto, Categoria, Talla, Color } from "../models";

import { productoCompletoDTO } from "../interfaces/producto_x_completo.interface";
import sequelize from "../config/database";

export const getAllProductoCompleto = async () => {
  try {
    return await ProductoCompleto.findAll({
      include: [
        {
          model: Producto,
          as: "producto",
          include: [{ model: Categoria, as: "categoria" }],
        },
        { model: Talla, as: "talla" },
        { model: Color, as: "color" },
      ],
    });
  } catch (error) {
    console.error("Error al obtener productos completos:", error);
    throw error;
  }
};

export const getProductoCompletoById = async (id: number) => {
  try {
    return await ProductoCompleto.findByPk(id, {
      include: [
        {
          model: Producto,
          as: "producto",
          include: [{ model: Categoria, as: "categoria" }],
        },
        { model: Talla, as: "talla" },
        { model: Color, as: "color" },
      ],
    });
  } catch (error) {
    console.error("Error al obtener producto completo por ID:", error);
    throw error;
  }
};

export const createProductoCompleto = async (data: productoCompletoDTO) => {
  const transaction = await sequelize.transaction();
  try {

    const productoCompleto = await ProductoCompleto.create(data, {
      transaction,
    });
    // Buscar producto asociado
    const producto = await Producto.findByPk(data.id_producto, { transaction });
    if (!producto) throw new Error("Producto no encontrado");

    // Aumentar el stock
    producto.cantidad_stock += data.cantidad;
    await producto.save({ transaction });

    await transaction.commit();
    return productoCompleto;
  } catch (error) {
    await transaction.rollback();
    console.error("Error al crear producto completo:", error);
    throw error;
  }
};


export const updateProductoCompleto = async (
  id: number,
  data: productoCompletoDTO
) => {
  const transaction = await sequelize.transaction();
  try {
    const productoCompleto = await ProductoCompleto.findByPk(id, { transaction });
    if (!productoCompleto) throw new Error("Producto completo no encontrado");

    // Verificar que no cambie el id_producto
    if (
      data.id_producto &&
      data.id_producto !== productoCompleto.id_producto
    ) {
      throw new Error("No se permite cambiar el id_producto en un producto completo existente");
    }

    // Buscar producto asociado
    const producto = await Producto.findByPk(productoCompleto.id_producto, { transaction });
    if (!producto) throw new Error("Producto no encontrado");

    // Ajustar stock si cambia la cantidad
    if (data.cantidad !== undefined) {
      const diferencia = data.cantidad - productoCompleto.cantidad;
      producto.cantidad_stock += diferencia;
      await producto.save({ transaction });
    }

    await productoCompleto.update(data, { transaction });
    await transaction.commit();

    return productoCompleto;
  } catch (error) {
    await transaction.rollback();
    console.error("Error al actualizar producto completo:", error);
    throw error;
  }
};


export const deleteProductoCompleto = async (id: number) => {
  const transaction = await sequelize.transaction();
  try {
    const productoCompleto = await ProductoCompleto.findByPk(id, { transaction });
    if (!productoCompleto) throw new Error("Producto completo no encontrado");

    // Buscar producto asociado
    const producto = await Producto.findByPk(productoCompleto.id_producto, { transaction });
    if (!producto) throw new Error("Producto no encontrado");

    // Restar stock
    producto.cantidad_stock -= productoCompleto.cantidad;
    await producto.save({ transaction });

    await productoCompleto.destroy({ transaction });

    await transaction.commit();
    return { message: "Producto completo eliminado correctamente" };
  } catch (error) {
    await transaction.rollback();
    console.error("Error al eliminar producto completo:", error);
    throw error;
  }
};
