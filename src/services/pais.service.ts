import { CreatePaisDTO } from "../interfaces/pais.interface";
import { Pais } from "../models";

// todo: Obtener todos los países
export const getAllPaiss = async () => {
  try {
    const paises = await Pais.findAll();
    return paises;
  } catch (error) {
    console.error("Error al obtener países:", error);
    throw error;
  }
};

// todo: Obtener país por ID
export const getPaisById = async (id: string) => {
  try {
    const pais = await Pais.findByPk(id);
    return pais;
  } catch (error) {
    console.error("Error al obtener país por ID:", error);
    throw error;
  }
};

// todo: Crear nuevo país
export const createPais = async (data: CreatePaisDTO) => {
  try {
    // Validar que no exista otro país con el mismo nombre
    const exist = await Pais.findOne({ where: { nombre: data.nombre } });
    if (exist) throw new Error(`Ya existe un país con el nombre "${data.nombre}"`);

    const pais = await Pais.create(data);
    return pais;
  } catch (error) {
    console.error("Error al crear país:", error);
    throw error;
  }
};

// todo: Actualizar país
export const updatePais = async (id: string, data: any) => {
  try {
    const pais = await Pais.findByPk(id);
    if (!pais) throw new Error("País no encontrado");

    // Validar que no se repita el nombre
    if (data.nombre && data.nombre !== pais.nombre) {
      const exist = await Pais.findOne({ where: { nombre: data.nombre } });
      if (exist) throw new Error(`Ya existe un país con el nombre "${data.nombre}"`);
    }

    const updated = await pais.update(data);
    return updated;
  } catch (error) {
    console.error("Error al actualizar país:", error);
    throw error;
  }
};

// todo: Eliminar país
export const deletePais = async (id: number) => {
  try {
    const pais = await Pais.findByPk(id);
    if (!pais) throw new Error("País no encontrado");

    await pais.destroy();
    return { deletedId: id };
  } catch (error) {
    console.error("Error al eliminar país:", error);
    throw error;
  }
};
