import { CreateCategoriaDTO } from "../interfaces/categoria.interface";
import { Categoria } from "../models";

export const getAllCategorias = async () => {
  try {
    const categoria = await Categoria.findAll();
    return categoria;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    throw error;
  }
};

export const getCategoriaById = async (id: string) => {
  try {
    const categoria = await Categoria.findByPk(id);
    return categoria;
  } catch (error) {
    console.error("Error al obtener categoría por ID:", error);
    throw error;
  }
};

export const createCategoria = async (data: CreateCategoriaDTO) => {
    try {
        return Categoria.create(data);
    }catch (error) {
        console.error("Error al crear categoría:", error);
        throw error;
    }
};

export const updateCategoria = async (id: string, data: any) => {
  try {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) throw new Error("Categoría no encontrada");
    return categoria.update(data);
  }catch (error) {
    console.error("Error al actualizar categoría:", error);
    throw error;
  }
};

export const deleteCategoria = async (id: string) => {
  try {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) throw new Error("Categoría no encontrada");
    await categoria.destroy();
    return { message: `Categoría ${id} eliminada correctamente` };
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    throw error;
  }
};
 