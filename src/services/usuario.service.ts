import {
  CreateUsuarioDTO,
  UpdateUsuarioDTO,
} from "../interfaces/usuario.interface";
import { Usuario, Persona, Pais } from "../models";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../config/database";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

// todo: Obtener todos los usuarios
export const getAllUsuarios = async () => {
  try {
    return await Usuario.findAll({
      include: [
        {
          model: Persona,
          as: "persona",
          include: [{ model: Pais, as: "pais" }],
        },
      ],
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

// todo: Obtener usuario por ID
export const getUsuarioById = async (id: string) => {
  try {
    return await Usuario.findByPk(id, {
      include: [
        {
          model: Persona,
          as: "persona",
          include: [{ model: Pais, as: "pais" }],
        },
      ],
    });
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    throw error;
  }
};

// todo: Crear usuario + persona asociada
export const createUsuario = async (data: CreateUsuarioDTO) => {
  const transaction = await sequelize.transaction();
  try {
    // Validar país
    const paisExiste = await Pais.findByPk(data.persona.id_pais);
    if (!paisExiste) throw new Error("El país seleccionado no existe.");

    // Validar duplicados (correo, teléfono, cédula)
    const exist = await Persona.findOne({
      where: {
        [Op.or]: [
          { email: data.persona.correo },
          { telefono: data.persona.telefono },
          { cedula: data.persona.cedula },
        ],
      },
    });
    if (exist)
      throw new Error("Ya existe una persona con el mismo correo, teléfono o cédula.");

    // Crear persona
    const persona = await Persona.create(
      {
        nombre: data.persona.nombre!,
        apellido: data.persona.apellido!,
        email: data.persona.correo!,
        telefono: data.persona.telefono!,
        genero: data.persona.genero!,
        cedula: data.persona.cedula!,
        ciudad: data.persona.ciudad!,
        edad: data.persona.edad!,
        id_pais: data.persona.id_pais!,
      },
      { transaction }
    );

    // Crear usuario con contraseña encriptada
    const hashedPassword = await bcrypt.hash(data.usuario.password, 10);
    const usuario = await Usuario.create(
      {
        id_usuario: uuidv4(),
        ...data.usuario,
        password: hashedPassword,
        id_persona: persona.id_persona,
      },
      { transaction }
    );

    await transaction.commit();
    return { usuario, persona };
  } catch (error) {
    await transaction.rollback();
    console.error("Error al crear usuario:", error);
    throw error;
  }
};

// todo: Actualizar usuario y persona
export const updateUsuario = async (id: string, data: Partial<UpdateUsuarioDTO>) => {
  const transaction = await sequelize.transaction();
  try {
    const usuario = await Usuario.findByPk(id, { include: [{ model: Persona, as: "persona" }] });
    if (!usuario) throw new Error("Usuario no encontrado");

    const persona = usuario.persona;
    if (!persona) throw new Error("Persona asociada no encontrada");

    // Validar duplicados (si cambian correo, teléfono o cédula)
    if (data.persona) {
      const { email, telefono, cedula } = data.persona;
      if (email || telefono || cedula) {
        const exist = await Persona.findOne({
          where: {
            [Op.or]: [
              email ? { email: email } : {},
              telefono ? { telefono } : {},
              cedula ? { cedula } : {},
            ],
            id_persona: { [Op.ne]: persona.id_persona },
          },
          transaction,
        });
        if (exist)
          throw new Error("Ya existe otra persona con el mismo correo, teléfono o cédula.");
      }
    }

    // Actualizar usuario
    if (data.usuario) await usuario.update(data.usuario, { transaction });

    // Actualizar persona
    if (data.persona) {
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
          cedula: data.persona.cedula ?? persona.cedula,
        },
        { transaction }
      );
    }

    await transaction.commit();
    return { usuario, persona };
  } catch (error) {
    await transaction.rollback();
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};

// todo: Eliminar usuario y persona asociada
export const deleteUsuario = async (id: string) => {
  const transaction = await sequelize.transaction();
  try {
    const usuario = await Usuario.findByPk(id, { include: [{ model: Persona, as: "persona" }] });
    if (!usuario) throw new Error("Usuario no encontrado");

    const persona = usuario.persona;
    if (!persona) throw new Error("Persona asociada no encontrada");

    await usuario.destroy({ transaction });
    await persona.destroy({ transaction });

    await transaction.commit();
    return { deletedId: id };
  } catch (error) {
    await transaction.rollback();
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};
