import { Color } from "../models";

// todo: Obtener todos los colores
export const getAllColors = async () => {
  try {
    const colors = await Color.findAll();
    return colors;
  } catch (error) {
    console.error("Error al obtener colores:", error);
    throw error;
  }
};

// todo: Obtener color por ID
export const getColorById = async (id: number) => {
  try {
    const color = await Color.findByPk(id);
    return color;
  } catch (error) {
    console.error("Error al obtener color por ID:", error);
    throw error;
  }
};

// todo: Crear nuevo color
export const createColor = async (data: { color: string }) => {
  try {
    // Validar que no exista otro color con el mismo nombre
    const exist = await Color.findOne({ where: { color: data.color } });
    if (exist) throw new Error(`Ya existe un color con el nombre "${data.color}"`);

    const newColor = await Color.create(data);
    return newColor;
  } catch (error) {
    console.error("Error al crear color:", error);
    throw error;
  }
};

// todo: Actualizar color
export const updateColor = async (id: number, data: { color?: string }) => {
  try {
    const color = await Color.findByPk(id);
    if (!color) throw new Error("Color no encontrado");

    // Validar que el nuevo nombre no exista en otro registro
    if (data.color && data.color !== color.color) {
      const exist = await Color.findOne({ where: { color: data.color } });
      if (exist) throw new Error(`Ya existe un color con el nombre "${data.color}"`);
    }

    const updated = await color.update(data);
    return updated;
  } catch (error) {
    console.error("Error al actualizar color:", error);
    throw error;
  }
};

// todo: Eliminar color
export const deleteColor = async (id: number) => {
  try {
    const color = await Color.findByPk(id);
    if (!color) throw new Error("Color no encontrado");

    await color.destroy();
    return { deletedId: id };
  } catch (error) {
    console.error("Error al eliminar color:", error);
    throw error;
  }
};
