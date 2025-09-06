import { Color } from "../models";

export const getAllColors = async () => {
  try {
    return await Color.findAll();
  } catch (error) {
    console.error("Error al obtener colores:", error);
    throw error;
  }
};

export const getColorById = async (id: number) => {
  try {
    return await Color.findByPk(id);
  } catch (error) {
    console.error("Error al obtener color por ID:", error);
    throw error;
  }
};

export const createColor = async (data: { color: string }) => {
  try {
    return await Color.create(data);
  } catch (error) {
    console.error("Error al crear color:", error);
    throw error;
  }
};

export const updateColor = async (id: number, data: { color?: string }) => {
  try {
    const color = await Color.findByPk(id);
    if (!color) throw new Error("Color no encontrado");
    return await color.update(data);
  } catch (error) {
    console.error("Error al actualizar color:", error);
    throw error;
  }
};

export const deleteColor = async (id: number) => {
  try {
    const color = await Color.findByPk(id);
    if (!color) throw new Error("Color no encontrado");
    await color.destroy();
    return { message: `Color ${id} eliminado correctamente` };
  } catch (error) {
    console.error("Error al eliminar color:", error);
    throw error;
  }
};
