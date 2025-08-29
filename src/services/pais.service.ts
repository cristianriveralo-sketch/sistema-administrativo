import { CreatePaisDTO } from "../interfaces/pais.interface";
import { Pais } from "../models";

export const getAllPaiss = async () => {
  try {
    const pais = await Pais.findAll();
    return pais;
  } catch (error) {
    console.error("Error al obtener pais:", error);
    throw error;
  }
};

export const getPaisById = async (id: string) => {
  try {
    const pais = await Pais.findByPk(id);
    return pais;
  } catch (error) {
    console.error("Error al obtener pais por ID:", error);
    throw error;
  }
};

export const createPais = async (data: CreatePaisDTO) => {
    try {
        return Pais.create(data);
    }catch (error) {
        console.error("Error al crear pais:", error);
        throw error;
    }
};

export const updatePais = async (id: string, data: any) => {
  try {
    const pais = await Pais.findByPk(id);
    if (!pais) throw new Error("pais no encontrado");
    return pais.update(data);
  }catch (error) {
    console.error("Error al actualizar pais:", error);
    throw error;
  }
};

export const deletePais = async (id: string) => {
  try {
    const pais = await Pais.findByPk(id);
    if (!pais) throw new Error("pais no encontrado");
    await pais.destroy();
    return { message: `pais ${id} eliminada correctamente` };
  } catch (error) {
    console.error("Error al eliminar pais:", error);
    throw error;
  }
};
