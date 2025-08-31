import {
  CreateUsuarioDTO,
  UpdateUsuarioDTO,
} from "../interfaces/usuario.interface";
import { Usuario, Persona } from "../models";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../config/database";

export const getAllUsuarios = async () => {
  try {
    return await Usuario.findAll({
      include: [{ model: Persona, as: "persona" }],
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

export const getUsuarioById = async (id: string) => {
  try {
    return await Usuario.findByPk(id, {
      include: [{ model: Persona, as: "persona" }],
    });
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    throw error;
  }
};

export const createUsuario = async (data: CreateUsuarioDTO) => {
  const transaction = await sequelize.transaction();
  try {
    const mapPersonaDTOToModel = (dto: CreateUsuarioDTO["persona"]) => ({
      nombre: dto.nombre!, 
      apellido: dto.apellido!,
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

    // Crear usuario con el id_persona generado
    const usuario = await Usuario.create(
      {
        id_usuario: uuidv4(),
        ...data.usuario,
        id_persona: persona.id_persona,
      },
      { transaction }
    );

    await transaction.commit();
    return { usuario, persona };
  } catch (error) {
    await transaction.rollback();
    console.error("Error al crear usuario y persona:", error);
    throw error;
  }
};

export const updateUsuario = async (
  id: string,
  data: Partial<UpdateUsuarioDTO>
) => {
  const transaction = await sequelize.transaction();
  try {
    const usuario = await Usuario.findByPk(id, {
      include: [{ model: Persona, as: "persona" }],
    });

    if (!usuario) throw new Error("Usuario no encontrado");

    // Actualizar usuario
    if (data.usuario) {
      await usuario.update({ ...data.usuario }, { transaction });
    }

    // Actualizar persona
    if (data.persona && usuario.getDataValue("persona")) {
      const persona = usuario.getDataValue("persona");

      await persona.update(
        {
          nombre: data.persona.nombre ?? persona.nombre,
          apellido: data.persona.apellido ?? persona.apellido,
          email: data.persona.email ?? persona.email,
          telefono: data.persona.telefono ?? persona.telefono,
          genero: data.persona.genero ?? persona.genero,
          ciudad: data.persona.ciudad ?? persona.ciudad,
          edad: data.persona.edad ?? persona.edad,
          id_pais: data.persona.id_pais ?? persona.id_pais,
        },
        { transaction }
      );
    }

    await transaction.commit();
    return usuario;
  } catch (error) {
    await transaction.rollback();
    console.error("Error al actualizar usuario y persona:", error);
    throw error;
  }
};

export const deleteUsuario = async (id: string) => {
  const transaction = await sequelize.transaction();
  try {
    const usuario = await Usuario.findByPk(id, {
      include: [{ model: Persona, as: "persona" }],
    });
    if (!usuario) throw new Error("Usuario no encontrado");

    // Borrar la persona asociada
    if (usuario.persona) {
      await usuario.persona.destroy({ transaction });
    }

    // Borrar el usuario
    await usuario.destroy({ transaction });

    await transaction.commit();
    return {
      message: `Usuario ${id} y su persona asociada eliminados correctamente`,
    };
  } catch (error) {
    await transaction.rollback();
    console.error("Error al eliminar usuario y persona:", error);
    throw error;
  }
};
