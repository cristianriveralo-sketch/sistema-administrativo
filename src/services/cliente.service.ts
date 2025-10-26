import { Cliente, Persona, Pais } from "../models";
import {
  CreateClienteDTO,
  UpdateClienteDTO,
} from "../interfaces/cliente.interface";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../config/database";
import { Op } from "sequelize";

// todo: Obtener todos los clientes
export const getAllClientes = async () => {
  try {
    return await Cliente.findAll({
      include: [
        {
          model: Persona,
          as: "persona",
          include: [{ model: Pais, as: "pais" }],
        },
      ],
    });
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    throw error;
  }
};

// todo: Obtener cliente por ID
export const getClienteById = async (id: string) => {
  try {
    return await Cliente.findByPk(id, {
      include: [
        {
          model: Persona,
          as: "persona",
          include: [{ model: Pais, as: "pais" }],
        },
      ],
    });
  } catch (error) {
    console.error("Error al obtener cliente por ID:", error);
    throw error;
  }
};

// todo: Crear cliente y persona asociada
export const createCliente = async (data: CreateClienteDTO) => {
  const transaction = await sequelize.transaction();
  try {
    const dtoPersona = data.persona;

    // Validar país
    const pais = await Pais.findByPk(dtoPersona.id_pais);
    if (!pais) throw new Error("El país especificado no existe.");

    // Validar duplicados (correo, teléfono o cédula)
    const condiciones: any[] = [];
    if (dtoPersona.correo) condiciones.push({ email: dtoPersona.correo });
    if (dtoPersona.telefono) condiciones.push({ telefono: dtoPersona.telefono });
    if (dtoPersona.cedula) condiciones.push({ cedula: dtoPersona.cedula });

    if (condiciones.length > 0) {
      const existente = await Persona.findOne({
        where: { [Op.or]: condiciones },
        transaction,
      });

      if (existente) {
        const duplicados: string[] = [];
        if (dtoPersona.correo && existente.email === dtoPersona.correo)
          duplicados.push("correo");
        if (dtoPersona.telefono && existente.telefono === dtoPersona.telefono)
          duplicados.push("teléfono");
        if (dtoPersona.cedula && existente.cedula === dtoPersona.cedula)
          duplicados.push("cédula");

        throw new Error(`Ya existe una persona con el mismo ${duplicados.join(", ")}.`);
      }
    }

    // Crear persona
    const persona = await Persona.create(
      {
        nombre: dtoPersona.nombre!,
        apellido: dtoPersona.apellido!,
        email: dtoPersona.correo!,
        telefono: dtoPersona.telefono!,
        genero: dtoPersona.genero!,
        cedula: dtoPersona.cedula!,
        ciudad: dtoPersona.ciudad!,
        edad: dtoPersona.edad!,
        id_pais: dtoPersona.id_pais!,
      },
      { transaction }
    );

    // Crear cliente
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

// todo: Actualizar cliente y persona
export const updateCliente = async (id: string, data: Partial<UpdateClienteDTO>) => {
  const transaction = await sequelize.transaction();
  try {
    const cliente = (await Cliente.findByPk(id, {
      include: [{ model: Persona, as: "persona" }],
      transaction,
    })) as Cliente & { persona?: Persona };

    if (!cliente) throw new Error("Cliente no encontrado");
    if (!cliente.persona) throw new Error("Persona asociada no encontrada");

    const persona = cliente.persona;

    // Validar duplicados (si cambian correo, teléfono o cédula)
    if (data.persona) {
      const { email, telefono, cedula } = data.persona;
      if (email || telefono || cedula) {
        const existe = await Persona.findOne({
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

        if (existe) {
          const duplicados: string[] = [];
          if (email && existe.email === email) duplicados.push("correo");
          if (telefono && existe.telefono === telefono) duplicados.push("teléfono");
          if (cedula && existe.cedula === cedula) duplicados.push("cédula");
          throw new Error(`Ya existe otra persona con el mismo ${duplicados.join(", ")}.`);
        }
      }
    }

    // Actualizar cliente
    if (data.cliente) await cliente.update(data.cliente, { transaction });

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
    return { cliente, persona };
  } catch (error) {
    await transaction.rollback();
    console.error("Error al actualizar cliente:", error);
    throw error;
  }
};

// todo: Eliminar cliente y persona asociada
export const deleteCliente = async (id: string) => {
  const transaction = await sequelize.transaction();
  try {
    const cliente = (await Cliente.findByPk(id, {
      include: [{ model: Persona, as: "persona" }],
      transaction,
    })) as Cliente & { persona?: Persona };

    if (!cliente) throw new Error("Cliente no encontrado");
    if (!cliente.persona) throw new Error("Persona asociada no encontrada");

    await cliente.destroy({ transaction });
    await cliente.persona.destroy({ transaction });

    await transaction.commit();
    return { deletedId: id };
  } catch (error) {
    await transaction.rollback();
    console.error("Error al eliminar cliente:", error);
    throw error;
  }
};
