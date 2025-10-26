import { Talla } from "../models";

// todo: Obtener todas las tallas
export const getAlltallas = async () => {
  try {
    const tallas = await Talla.findAll();
    return tallas;
  } catch (error) {
    console.error("Error al obtener tallas:", error);
    throw error;
  }
};

// todo: Obtener talla por ID
export const gettallaById = async (id: number) => {
  try {
    const talla = await Talla.findByPk(id);
    return talla;
  } catch (error) {
    console.error("Error al obtener talla por ID:", error);
    throw error;
  }
};

// todo: Crear nueva talla
export const createtalla = async (data: { talla: string }) => {
  try {
    // Validar que no exista otra talla con el mismo nombre
    const exist = await Talla.findOne({ where: { talla: data.talla } });
    if (exist) throw new Error(`Ya existe una talla con el nombre "${data.talla}"`);

    const newTalla = await Talla.create(data);
    return newTalla;
  } catch (error) {
    console.error("Error al crear talla:", error);
    throw error;
  }
};

// todo: Actualizar talla
export const updatetalla = async (id: number, data: { talla?: string }) => {
  try {
    const talla = await Talla.findByPk(id);
    if (!talla) throw new Error("Talla no encontrada");

    // Validar que no se duplique el nombre
    if (data.talla && data.talla !== talla.talla) {
      const exist = await Talla.findOne({ where: { talla: data.talla } });
      if (exist) throw new Error(`Ya existe una talla con el nombre "${data.talla}"`);
    }

    const updated = await talla.update(data);
    return updated;
  } catch (error) {
    console.error("Error al actualizar talla:", error);
    throw error;
  }
};

// todo: Eliminar talla
export const deletetalla = async (id: number) => {
  try {
    const talla = await Talla.findByPk(id);
    if (!talla) throw new Error("Talla no encontrada");

    await talla.destroy();
    return { deletedId: id };
  } catch (error) {
    console.error("Error al eliminar talla:", error);
    throw error;
  }
};
