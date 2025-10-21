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
exports.deleteUsuario = exports.updateUsuario = exports.createUsuario = exports.getUsuarioById = exports.getAllUsuarios = void 0;
const models_1 = require("../models");
const uuid_1 = require("uuid");
const database_1 = __importDefault(require("../config/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getAllUsuarios = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield models_1.Usuario.findAll({
            include: [{ model: models_1.Persona, as: "persona" }],
        });
    }
    catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw error;
    }
});
exports.getAllUsuarios = getAllUsuarios;
const getUsuarioById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield models_1.Usuario.findByPk(id, {
            include: [{ model: models_1.Persona, as: "persona" }],
        });
    }
    catch (error) {
        console.error("Error al obtener usuario por ID:", error);
        throw error;
    }
});
exports.getUsuarioById = getUsuarioById;
const createUsuario = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield database_1.default.transaction();
    try {
        const mapPersonaDTOToModel = (dto) => ({
            nombre: dto.nombre,
            apellido: dto.apellido,
            email: dto.correo,
            telefono: dto.telefono,
            genero: dto.genero,
            ciudad: dto.ciudad,
            edad: dto.edad,
            id_pais: dto.id_pais,
        });
        // Crear persona
        const persona = yield models_1.Persona.create(mapPersonaDTOToModel(data.persona), {
            transaction,
        });
        // Crear usuario con el id_persona generado
        const hashedPassword = yield bcrypt_1.default.hash(data.usuario.password, 10);
        const usuario = yield models_1.Usuario.create(Object.assign(Object.assign({ id_usuario: (0, uuid_1.v4)() }, data.usuario), { password: hashedPassword, id_persona: persona.id_persona }), { transaction });
        yield transaction.commit();
        return { usuario, persona };
    }
    catch (error) {
        yield transaction.rollback();
        console.error("Error al crear usuario y persona:", error);
        throw error;
    }
});
exports.createUsuario = createUsuario;
const updateUsuario = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const transaction = yield database_1.default.transaction();
    try {
        const usuario = yield models_1.Usuario.findByPk(id, {
            include: [{ model: models_1.Persona, as: "persona" }],
        });
        if (!usuario)
            throw new Error("Usuario no encontrado");
        // Actualizar usuario
        if (data.usuario) {
            yield usuario.update(Object.assign({}, data.usuario), { transaction });
        }
        // Actualizar persona
        if (data.persona && usuario.getDataValue("persona")) {
            const persona = usuario.getDataValue("persona");
            yield persona.update({
                nombre: (_a = data.persona.nombre) !== null && _a !== void 0 ? _a : persona.nombre,
                apellido: (_b = data.persona.apellido) !== null && _b !== void 0 ? _b : persona.apellido,
                email: (_c = data.persona.email) !== null && _c !== void 0 ? _c : persona.email,
                telefono: (_d = data.persona.telefono) !== null && _d !== void 0 ? _d : persona.telefono,
                genero: (_e = data.persona.genero) !== null && _e !== void 0 ? _e : persona.genero,
                ciudad: (_f = data.persona.ciudad) !== null && _f !== void 0 ? _f : persona.ciudad,
                edad: (_g = data.persona.edad) !== null && _g !== void 0 ? _g : persona.edad,
                id_pais: (_h = data.persona.id_pais) !== null && _h !== void 0 ? _h : persona.id_pais,
            }, { transaction });
        }
        yield transaction.commit();
        return usuario;
    }
    catch (error) {
        yield transaction.rollback();
        console.error("Error al actualizar usuario y persona:", error);
        throw error;
    }
});
exports.updateUsuario = updateUsuario;
const deleteUsuario = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield database_1.default.transaction();
    try {
        const usuario = yield models_1.Usuario.findByPk(id, {
            include: [{ model: models_1.Persona, as: "persona" }],
        });
        if (!usuario)
            throw new Error("Usuario no encontrado");
        // Borrar la persona asociada
        if (usuario.persona) {
            yield usuario.persona.destroy({ transaction });
        }
        // Borrar el usuario
        yield usuario.destroy({ transaction });
        yield transaction.commit();
        return {
            message: `Usuario ${id} y su persona asociada eliminados correctamente`,
        };
    }
    catch (error) {
        yield transaction.rollback();
        console.error("Error al eliminar usuario y persona:", error);
        throw error;
    }
});
exports.deleteUsuario = deleteUsuario;
