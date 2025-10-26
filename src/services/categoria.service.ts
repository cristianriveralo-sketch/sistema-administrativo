import { CreateCategoriaDTO } from "../interfaces/categoria.interface";
import { Categoria } from "../models";

// todo: Obtener todas las categorías
export const getAllCategorias = async () => {
  try {
    const categorias = await Categoria.findAll();
    return categorias;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    throw error;
  }
};

// todo: Obtener categoría por ID
export const getCategoriaById = async (id: string) => {
  try {
    const categoria = await Categoria.findByPk(id);
    return categoria;
  } catch (error) {
    console.error("Error al obtener categoría por ID:", error);
    throw error;
  }
};

// todo: Crear nueva categoría
export const createCategoria = async (data: CreateCategoriaDTO) => {
  try {
    // Validar que no exista otra categoría con el mismo nombre
    const exist = await Categoria.findOne({ where: { nombre: data.nombre } });
    if (exist) throw new Error(`Ya existe una categoría con el nombre "${data.nombre}"`);

    const categoria = await Categoria.create(data);
    return categoria;
  } catch (error) {
    console.error("Error al crear categoría:", error);
    throw error;
  }
};

// todo: Actualizar categoría
export const updateCategoria = async (id: string, data: any) => {
  try {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) throw new Error("Categoría no encontrada");

    // Validar que no se renombre a un nombre ya existente
    if (data.nombre && data.nombre !== categoria.nombre) {
      const exist = await Categoria.findOne({ where: { nombre: data.nombre } });
      if (exist) throw new Error(`Ya existe una categoría con el nombre "${data.nombre}"`);
    }

    const updated = await categoria.update(data);
    return updated;
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
    throw error;
  }
};

// todo: Eliminar categoría
export const deleteCategoria = async (id: string) => {
  try {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) throw new Error("Categoría no encontrada");

    await categoria.destroy();
    return { deletedId: id };
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    throw error;
  }
};
