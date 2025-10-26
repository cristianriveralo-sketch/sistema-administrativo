import { Persona, Proveedor, Pais } from "../models";
import {
  CreateProveedorDTO,
  UpdateProveedorDTO,
} from "../interfaces/proveedor.interface";
import sequelize from "../config/database";
import { Op } from "sequelize"; // ✅ Importar Op correctamente

// todo: Obtener todos los proveedores
export const getAllProveedores = async () => {
  try {
    const proveedores = await Proveedor.findAll({
      include: [
        {
          model: Persona,
          as: "persona",
          include: [{ model: Pais, as: "pais" }],
        },
      ],
    });
    return proveedores;
  } catch (error) {
    console.error("Error al obtener proveedores:", error);
    throw error;
  }
};

// todo: Obtener proveedor por ID
export const getProveedorById = async (id: number) => {
  try {
    const proveedor = await Proveedor.findByPk(id, {
      include: [
        {
          model: Persona,
          as: "persona",
          include: [{ model: Pais, as: "pais" }],
        },
      ],
    });
    return proveedor;
  } catch (error) {
    console.error("Error al obtener proveedor por ID:", error);
    throw error;
  }
};

// todo: Crear proveedor y persona asociada
export const createProveedor = async (data: CreateProveedorDTO) => {
  const transaction = await sequelize.transaction();
  try {
    const personaData = {
      nombre: data.persona.nombres!,
      apellido: data.persona.apellidos!,
      email: data.persona.correo!,
      telefono: data.persona.telefono!,
      genero: data.persona.genero!,
      cedula: data.persona.cedula!,
      ciudad: data.persona.ciudad!,
      edad: data.persona.edad!,
      id_pais: data.persona.id_pais!,
    };

    // ✅ Validar duplicados (correo, teléfono o cédula)
    const exist = await Persona.findOne({
      where: {
        [Op.or]: [
          { email: personaData.email },
          { telefono: personaData.telefono },
          { cedula: personaData.cedula },
        ],
      },
    });
    if (exist)
      throw new Error(
        `Ya existe una persona con el mismo correo, teléfono o cédula.`
      );

    // Crear persona
    const persona = await Persona.create(personaData, { transaction });

    // Crear proveedor asociado
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

// todo: Actualizar proveedor y persona
export const updateProveedor = async (
  id: number,
  data: Partial<UpdateProveedorDTO>
) => {
  const transaction = await sequelize.transaction();
  try {
    const proveedor = await Proveedor.findByPk(id, { transaction });
    if (!proveedor) throw new Error("Proveedor no encontrado");

    const persona = await Persona.findByPk(proveedor.id_persona, { transaction });
    if (!persona) throw new Error("Persona asociada no encontrada");

    // ✅ Validar duplicados antes de actualizar
    if (data.persona) {
      const { correo, telefono, cedula } = data.persona;

      if (correo || telefono || cedula) {
        const exist = await Persona.findOne({
          where: {
            [Op.or]: [
              correo ? { email: correo } : {},
              telefono ? { telefono } : {},
              cedula ? { cedula } : {},
            ],
            id_persona: { [Op.ne]: persona.id_persona }, // excluye la misma persona
          },
          transaction,
        });

        if (exist)
          throw new Error(
            `Ya existe otra persona con el mismo correo, teléfono o cédula.`
          );
      }
    }

    // Actualizar proveedor
    if (data.proveedor) await proveedor.update(data.proveedor, { transaction });

    // Actualizar persona
    if (data.persona) {
      const updatedPersona = {
        nombre: data.persona.nombres ?? persona.nombre,
        apellido: data.persona.apellidos ?? persona.apellido,
        email: data.persona.correo ?? persona.email,
        telefono: data.persona.telefono ?? persona.telefono,
        genero: data.persona.genero ?? persona.genero,
        ciudad: data.persona.ciudad ?? persona.ciudad,
        edad: data.persona.edad ?? persona.edad,
        id_pais: data.persona.id_pais ?? persona.id_pais,
        cedula: data.persona.cedula ?? persona.cedula,
      };

      await persona.update(updatedPersona, { transaction });
    }

    await transaction.commit();
    return { proveedor, persona };
  } catch (error) {
    await transaction.rollback();
    console.error("Error al actualizar proveedor:", error);
    throw error;
  }
};

// todo: Eliminar proveedor y persona asociada
export const deleteProveedor = async (id: number) => {
  const transaction = await sequelize.transaction();
  try {
    const proveedor = await Proveedor.findByPk(id, { transaction });
    if (!proveedor) throw new Error("Proveedor no encontrado");

    const persona = await Persona.findByPk(proveedor.id_persona, { transaction });
    if (!persona) throw new Error("Persona asociada no encontrada");

    await proveedor.destroy({ transaction });
    await persona.destroy({ transaction });

    await transaction.commit();
    return { deletedId: id };
  } catch (error) {
    await transaction.rollback();
    console.error("Error al eliminar proveedor:", error);
    throw error;
  }
};
