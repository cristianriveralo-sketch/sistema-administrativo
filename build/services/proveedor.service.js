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
exports.deleteProveedor = exports.updateProveedor = exports.createProveedor = exports.getProveedorById = exports.getAllProveedores = void 0;
const models_1 = require("../models");
const database_1 = __importDefault(require("../config/database"));
("../config/database");
const getAllProveedores = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield models_1.Proveedor.findAll({
            include: [
                { model: models_1.Persona, as: "persona", include: [
                        { model: models_1.Pais, as: "pais" }
                    ] },
            ],
        });
    }
    catch (error) {
        console.error("Error al obtener proveedores:", error);
        throw error;
    }
});
exports.getAllProveedores = getAllProveedores;
const getProveedorById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield models_1.Proveedor.findByPk(id, {
            include: [{ model: models_1.Persona, as: "persona", include: [
                        { model: models_1.Pais, as: "pais" }
                    ] }],
        });
    }
    catch (error) {
        console.error("Error al obtener proveedor por ID:", error);
        throw error;
    }
});
exports.getProveedorById = getProveedorById;
const createProveedor = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield database_1.default.transaction();
    try {
        const mapPersonaDTOToModel = (dto) => ({
            nombre: dto.nombres,
            apellido: dto.apellidos,
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
        // Crear proveedor con el id_persona generado
        const proveedor = yield models_1.Proveedor.create(Object.assign(Object.assign({}, data.proveedor), { id_persona: persona.id_persona }), { transaction });
        yield transaction.commit();
        return { proveedor, persona };
    }
    catch (error) {
        yield transaction.rollback();
        console.error("Error al crear proveedor:", error);
        throw error;
    }
});
exports.createProveedor = createProveedor;
const updateProveedor = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield database_1.default.transaction();
    try {
        const proveedor = yield models_1.Proveedor.findByPk(id, { transaction });
        if (!proveedor)
            throw new Error("Proveedor no encontrado");
        const persona = yield models_1.Persona.findByPk(proveedor.id_persona, {
            transaction,
        });
        if (!persona)
            throw new Error("Persona asociada no encontrada");
        //actualizar proveedor
        if (data.proveedor) {
            yield proveedor.update(data.proveedor, { transaction });
        }
        //actualizar persona
        if (data.persona) {
            const mapUpdatePersonaDTOToModel = (dto) => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                return ({
                    nombre: (_a = dto === null || dto === void 0 ? void 0 : dto.nombres) !== null && _a !== void 0 ? _a : persona.nombre,
                    apellido: (_b = dto === null || dto === void 0 ? void 0 : dto.apellidos) !== null && _b !== void 0 ? _b : persona.apellido,
                    email: (_c = dto === null || dto === void 0 ? void 0 : dto.correo) !== null && _c !== void 0 ? _c : persona.email,
                    telefono: (_d = dto === null || dto === void 0 ? void 0 : dto.telefono) !== null && _d !== void 0 ? _d : persona.telefono,
                    genero: (_e = dto === null || dto === void 0 ? void 0 : dto.genero) !== null && _e !== void 0 ? _e : persona.genero,
                    ciudad: (_f = dto === null || dto === void 0 ? void 0 : dto.ciudad) !== null && _f !== void 0 ? _f : persona.ciudad,
                    edad: (_g = dto === null || dto === void 0 ? void 0 : dto.edad) !== null && _g !== void 0 ? _g : persona.edad,
                    id_pais: (_h = dto === null || dto === void 0 ? void 0 : dto.id_pais) !== null && _h !== void 0 ? _h : persona.id_pais,
                });
            };
            yield persona.update(mapUpdatePersonaDTOToModel(data.persona), {
                transaction,
            });
        }
        yield transaction.commit();
        return { proveedor, persona };
    }
    catch (error) {
        yield transaction.rollback();
        console.error("Error al actualizar proveedor:", error);
        throw error;
    }
});
exports.updateProveedor = updateProveedor;
const deleteProveedor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield database_1.default.transaction();
    try {
        const proveedor = yield models_1.Proveedor.findByPk(id, { transaction });
        if (!proveedor)
            throw new Error("Proveedor no encontrado");
        const persona = yield models_1.Persona.findByPk(proveedor.id_persona, {
            transaction,
        });
        if (!persona)
            throw new Error("Persona asociada no encontrada");
        yield proveedor.destroy({ transaction });
        yield persona.destroy({ transaction });
        yield transaction.commit();
        return { message: `Proveedor ${id} eliminado correctamente` };
    }
    catch (error) {
        yield transaction.rollback();
        console.error("Error al eliminar proveedor:", error);
        throw error;
    }
});
exports.deleteProveedor = deleteProveedor;
