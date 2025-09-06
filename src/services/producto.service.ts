import { Producto, Categoria } from "../models";
import { productoDTO } from "../interfaces/producto.interface";
import sequelize from "../config/database";

export const getAllProductos = async () => {
  try {
    return await Producto.findAll({
      include: [{ model: Categoria, as: "categoria" }],
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

export const getProductoById = async (id: number) => {
  try {
    return await Producto.findByPk(id, {
      include: [{ model: Categoria, as: "categoria" }],
    });
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    throw error;
  }
};

export const createProducto = async (data: productoDTO) => {
  const transaction = await sequelize.transaction();
  try {
    const producto = await Producto.create(data, { transaction }); 
    await transaction.commit();
    return producto;
  } catch (error) {
    await transaction.rollback();
    console.error("Error al crear producto:", error);
    throw error;
  }
};


export const updateProducto = async (id: number, data: productoDTO) => {
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) throw new Error("Producto no encontrado");

    // Solo valida categoría si viene en el body
    if (data.id_categoria !== undefined) {
      const categoria = await Categoria.findByPk(data.id_categoria);
      if (!categoria) throw new Error("Categoría no encontrada");
    }

    return producto.update(data);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw error;
  }
};


export const deleteProducto = async (id: number) => {
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) throw new Error("Producto no encontrado");
    await producto.destroy();
    return { message: `Producto ${id} eliminado correctamente` };
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw error;
  }
};
