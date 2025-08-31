import { Talla } from "../models";

export const getAlltallas = async () => {
  try {
    return await Talla.findAll();
  } catch (error) {
    console.error("Error al obtener talla:", error);
    throw error;
  }
};

export const gettallaById = async (id: number) => {
  try {
    return await Talla.findByPk(id);
  } catch (error) {
    console.error("Error al obtener talla por ID:", error);
    throw error;
  }
};

export const createtalla = async (data: { talla: string }) => {
  try {
    return await Talla.create(data);
  } catch (error) {
    console.error("Error al crear talla:", error);
    throw error;
  }
};

export const updatetalla = async (id: number, data: { talla?: string }) => {
  try {
    const talla = await Talla.findByPk(id);
    if (!talla) throw new Error("talla no encontrado");
    return await talla.update(data);
  } catch (error) {
    console.error("Error al actualizar talla:", error);
    throw error;
  }
};

export const deletetalla = async (id: number) => {
  try {
    const talla = await Talla.findByPk(id);
    if (!talla) throw new Error("talla no encontrado");
    await talla.destroy();
    return { message: `talla ${id} eliminado correctamente` };
  } catch (error) {
    console.error("Error al eliminar talla:", error);
    throw error;
  }
};
