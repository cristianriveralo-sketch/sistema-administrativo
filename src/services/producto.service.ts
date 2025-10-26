import { Producto, Categoria } from "../models";
import { productoDTO } from "../interfaces/producto.interface";
import sequelize from "../config/database";
import { Op } from "sequelize";

// Obtener todos los productos
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

// Obtener producto por ID
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

// Crear producto con validación de nombre duplicado
export const createProducto = async (data: productoDTO) => {
  const transaction = await sequelize.transaction();
  try {
    // Verifica si ya existe un producto con el mismo nombre
    const existingProducto = await Producto.findOne({
      where: { nombre: data.nombre },
    });

    if (existingProducto) {
      throw new Error(`Ya existe un producto con el nombre "${data.nombre}".`);
    }

    // Verifica si la categoría existe
    if (data.id_categoria !== undefined) {
      const categoria = await Categoria.findByPk(data.id_categoria);
      if (!categoria) throw new Error("Categoría no encontrada");
    }

    const producto = await Producto.create(data, { transaction });
    await transaction.commit();
    return producto;
  } catch (error) {
    await transaction.rollback();
    console.error("Error al crear producto:", error);
    throw error;
  }
};

// Actualizar producto con validación de duplicado
export const updateProducto = async (id: number, data: productoDTO) => {
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) throw new Error("Producto no encontrado");

    // Si viene un nombre nuevo, verificar que no esté en uso por otro producto
    if (data.nombre) {
      const existingProducto = await Producto.findOne({
        where: {
          nombre: data.nombre,
          id_producto: { [Op.ne]: id }, // excluye el producto actual
        },
      });
      if (existingProducto) {
        throw new Error(`Ya existe otro producto con el nombre "${data.nombre}".`);
      }
    }

    // Verifica si la categoría existe si viene en el body
    if (data.id_categoria !== undefined) {
      const categoria = await Categoria.findByPk(data.id_categoria);
      if (!categoria) throw new Error("Categoría no encontrada");
    }

    return await producto.update(data);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw error;
  }
};

// ✅ Eliminar producto
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
