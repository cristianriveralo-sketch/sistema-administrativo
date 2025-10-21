import { Cliente, Persona, Pais } from "../models";
import {
  CreateClienteDTO,
  UpdateClienteDTO,
} from "../interfaces/cliente.interface";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../config/database";
import { Op } from "sequelize";


export const getAllClientes = async () => {
  try {
    return await Cliente.findAll({
      include: [{ model: Persona, as: "persona" }],
    });
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    throw error;
  }
};

export const getClienteById = async (id: string) => {
  try {
    return await Cliente.findByPk(id, {
      include: [{ model: Persona, as: "persona" }],
    });
  } catch (error) {
    console.error("Error al obtener cliente por ID:", error);
    throw error;
  }
};

export const createCliente = async (data: CreateClienteDTO) => {
  const transaction = await sequelize.transaction();

  try {
    const dtoPersona = data.persona;

    const pais = await Pais.findByPk(dtoPersona.id_pais);
    if (!pais) {
      throw new Error("El país especificado no existe.");
    }

    const condiciones: any[] = [];
    if (dtoPersona.correo) condiciones.push({ email: dtoPersona.correo });
    if (dtoPersona.telefono) condiciones.push({ telefono: dtoPersona.telefono });
    if (dtoPersona.cedula) condiciones.push({ cedula: dtoPersona.cedula });

    if (condiciones.length > 0) {
      const existingPersona = await Persona.findOne({
        where: { [Op.or]: condiciones },
      });

      if (existingPersona) {
        throw new Error("Ya existe una persona con el mismo correo, teléfono o cédula.");
      }
    }

    const mapPersonaDTOToModel = (dto: CreateClienteDTO["persona"]) => ({
      nombre: dto.nombre!,
      apellido: dto.apellido!,
      email: dto.correo!,
      telefono: dto.telefono!,
      genero: dto.genero!,
      cedula: dto.cedula!,
      ciudad: dto.ciudad!,
      edad: dto.edad!,
      id_pais: dto.id_pais!,
    });

    const persona = await Persona.create(mapPersonaDTOToModel(dtoPersona), {
      transaction,
    });

    const cliente = await Cliente.create(
      {
        id_cliente: uuidv4(),
        ...data.cliente,
        id_persona: persona.id_persona,
      },
      { transaction }
    );

    await transaction.commit();
    return { cliente, persona };

  } catch (error) {
    await transaction.rollback();
    console.error("Error al crear cliente:", error);
    throw error;
  }
};

export const updateCliente = async (
  id: string,
  data: Partial<UpdateClienteDTO>
) => {
  const transaction = await sequelize.transaction();
  try {
    const cliente = await Cliente.findByPk(id, { transaction });
    if (!cliente) throw new Error("Cliente no encontrado");

    const persona = await Persona.findByPk(cliente.id_persona, {
      transaction,
    });
    if (!persona) throw new Error("Persona no encontrada");

    // Actualizar datos del cliente si se proporcionan
    if (data.cliente) {
      await cliente.update(data.cliente, { transaction });
    }
    // Actualizar datos de la persona si se proporcionan
    if (data.persona) {
      await persona.update(data.persona, { transaction });
    }
    await transaction.commit();
    return { cliente, persona };
  } catch (error) {
    await transaction.rollback();
    console.error("Error al actualizar cliente:", error);
    throw error;
  }
};
export const deleteCliente = async (id: string) => {
  const transaction = await sequelize.transaction();
  try {
    const cliente = await Cliente.findByPk(id, { transaction });
    if (!cliente) throw new Error("Cliente no encontrado");

    const persona = await Persona.findByPk(cliente.id_persona, { transaction });
    if (!persona) throw new Error("Persona no encontrada");

    await cliente.destroy({ transaction });
    await persona.destroy({ transaction });
    await transaction.commit();
    return { message: `Cliente ${id} eliminado exitosamente` };
  } catch (error) {
    await transaction.rollback();
    console.error("Error al eliminar cliente:", error);
    throw error;
  }
};
