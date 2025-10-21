"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCliente = exports.updateCliente = exports.createCliente = exports.getClienteById = exports.getAllClientes = void 0;
const models_1 = require("../models");
const uuid_1 = require("uuid");
const database_1 = __importDefault(require("../config/database"));
const getAllClientes = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield models_1.Cliente.findAll({
            include: [{ model: models_1.Persona, as: "persona" }],
        });
    }
    catch (error) {
        console.error("Error al obtener clientes:", error);
        throw error;
    }
});
exports.getAllClientes = getAllClientes;
const getClienteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield models_1.Cliente.findByPk(id, {
            include: [{ model: models_1.Persona, as: "persona" }],
        });
    }
    catch (error) {
        console.error("Error al obtener cliente por ID:", error);
        throw error;
    }
});
exports.getClienteById = getClienteById;
const createCliente = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield database_1.default.transaction();
    try {
        const mapPersonaDTOToModel = (dto) => ({
            nombre: dto.nombre,
            apellido: dto.apellido,
            email: dto.correo,
            telefono: dto.telefono,
            genero: dto.genero,
            cedula: dto.cedula,
            ciudad: dto.ciudad,
            edad: dto.edad,
            id_pais: dto.id_pais,
        });
        // Crear persona
        const persona = yield models_1.Persona.create(mapPersonaDTOToModel(data.persona), {
            transaction,
        });
        // Crear cliente con el id_persona generado
        const cliente = yield models_1.Cliente.create(Object.assign(Object.assign({ id_cliente: (0, uuid_1.v4)() }, data.cliente), { id_persona: persona.id_persona }), { transaction });
        yield transaction.commit();
        return { cliente, persona };
    }
    catch (error) {
        yield transaction.rollback();
        console.error("Error al crear cliente:", error);
        throw error;
    }
});
exports.createCliente = createCliente;
const updateCliente = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield database_1.default.transaction();
    try {
        const cliente = yield models_1.Cliente.findByPk(id, { transaction });
        if (!cliente)
            throw new Error("Cliente no encontrado");
        const persona = yield models_1.Persona.findByPk(cliente.id_persona, {
            transaction,
        });
        if (!persona)
            throw new Error("Persona no encontrada");
        // Actualizar datos del cliente si se proporcionan
        if (data.cliente) {
            yield cliente.update(data.cliente, { transaction });
        }
        // Actualizar datos de la persona si se proporcionan
        if (data.persona) {
            yield persona.update(data.persona, { transaction });
        }
        yield transaction.commit();
        return { cliente, persona };
    }
    catch (error) {
        yield transaction.rollback();
        console.error("Error al actualizar cliente:", error);
        throw error;
    }
});
exports.updateCliente = updateCliente;
const deleteCliente = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield database_1.default.transaction();
    try {
        const cliente = yield models_1.Cliente.findByPk(id, { transaction });
        if (!cliente)
            throw new Error("Cliente no encontrado");
        const persona = yield models_1.Persona.findByPk(cliente.id_persona, { transaction });
        if (!persona)
            throw new Error("Persona no encontrada");
        yield cliente.destroy({ transaction });
        yield persona.destroy({ transaction });
        yield transaction.commit();
        return { message: `Cliente ${id} eliminado exitosamente` };
    }
    catch (error) {
        yield transaction.rollback();
        console.error("Error al eliminar cliente:", error);
        throw error;
    }
});
exports.deleteCliente = deleteCliente;
