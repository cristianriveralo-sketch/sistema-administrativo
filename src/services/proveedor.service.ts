import { Persona, Proveedor } from "../models";
import {
  CreateProveedorDTO,
  UpdateProveedorDTO,
} from "../interfaces/proveedor.interface";
import sequelize from "../config/database";
("../config/database");

export const getAllProveedores = async () => {
  try {
    return await Proveedor.findAll({
      include: [{ model: Persona, as: "persona" }],
    });
  } catch (error) {
    console.error("Error al obtener proveedores:", error);
    throw error;
  }
};

export const getProveedorById = async (id: number) => {
  try {
    return await Proveedor.findByPk(id, {
      include: [{ model: Persona, as: "persona" }],
    });
  } catch (error) {
    console.error("Error al obtener proveedor por ID:", error);
    throw error;
  }
};

export const createProveedor = async (data: CreateProveedorDTO) => {
  const transaction = await sequelize.transaction();
  try {
    const mapPersonaDTOToModel = (dto: CreateProveedorDTO["persona"]) => ({
      nombre: dto.nombres!,
      apellido: dto.apellidos!,
      email: dto.correo!,
      telefono: dto.telefono!,
      genero: dto.genero!,
      ciudad: dto.ciudad!,
      edad: dto.edad!,
      id_pais: dto.id_pais!,
    });

    // Crear persona
    const persona = await Persona.create(mapPersonaDTOToModel(data.persona), {
      transaction,
    });

    // Crear proveedor con el id_persona generado
    const proveedor = await Proveedor.create(
      { ...data.proveedor, id_persona: persona.id_persona },
      { transaction }
    );
    await transaction.commit();
    return { proveedor, persona };
  } catch (error) {
    await transaction.rollback();
    console.error("Error al crear proveedor:", error);
    throw error;
  }
};

export const updateProveedor = async (
  id: number,
  data: Partial<UpdateProveedorDTO>
) => {
  const transaction = await sequelize.transaction();
  try {
    const proveedor = await Proveedor.findByPk(id, { transaction });
    if (!proveedor) throw new Error("Proveedor no encontrado");

    const persona = await Persona.findByPk(proveedor.id_persona, {
      transaction,
    });
    if (!persona) throw new Error("Persona asociada no encontrada");

    //actualizar proveedor
    if (data.proveedor) {
      await proveedor.update(data.proveedor, { transaction });
    }

    //actualizar persona
    if (data.persona) {
      const mapUpdatePersonaDTOToModel = (
        dto: UpdateProveedorDTO["persona"]
      ) => ({
        nombre: dto?.nombres ?? persona.nombre,
        apellido: dto?.apellidos ?? persona.apellido,
        email: dto?.correo ?? persona.email,
        telefono: dto?.telefono ?? persona.telefono,
        genero: dto?.genero ?? persona.genero,
        ciudad: dto?.ciudad ?? persona.ciudad,
        edad: dto?.edad ?? persona.edad,
        id_pais: dto?.id_pais ?? persona.id_pais,
      });
      await persona.update(mapUpdatePersonaDTOToModel(data.persona), {
        transaction,
      });
    }
    await transaction.commit();
    return { proveedor, persona };
  } catch (error) {
    await transaction.rollback();
    console.error("Error al actualizar proveedor:", error);
    throw error;
  }
};

export const deleteProveedor = async (id: number) => {
  const transaction = await sequelize.transaction();
  try {
    const proveedor = await Proveedor.findByPk(id, { transaction });
    if (!proveedor) throw new Error("Proveedor no encontrado");
    const persona = await Persona.findByPk(proveedor.id_persona, {
      transaction,
    });
    if (!persona) throw new Error("Persona asociada no encontrada");
    await proveedor.destroy({ transaction });
    await persona.destroy({ transaction });
    await transaction.commit();
    return { message: `Proveedor ${id} eliminado correctamente` };
  } catch (error) {
    await transaction.rollback();
    console.error("Error al eliminar proveedor:", error);
    throw error;
  }
};
