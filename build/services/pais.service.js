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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePais = exports.updatePais = exports.createPais = exports.getPaisById = exports.getAllPaiss = void 0;
const models_1 = require("../models");
const getAllPaiss = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pais = yield models_1.Pais.findAll();
        return pais;
    }
    catch (error) {
        console.error("Error al obtener pais:", error);
        throw error;
    }
});
exports.getAllPaiss = getAllPaiss;
const getPaisById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pais = yield models_1.Pais.findByPk(id);
        return pais;
    }
    catch (error) {
        console.error("Error al obtener pais por ID:", error);
        throw error;
    }
});
exports.getPaisById = getPaisById;
const createPais = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return models_1.Pais.create(data);
    }
    catch (error) {
        console.error("Error al crear pais:", error);
        throw error;
    }
});
exports.createPais = createPais;
const updatePais = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pais = yield models_1.Pais.findByPk(id);
        if (!pais)
            throw new Error("pais no encontrado");
        return pais.update(data);
    }
    catch (error) {
        console.error("Error al actualizar pais:", error);
        throw error;
    }
});
exports.updatePais = updatePais;
const deletePais = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pais = yield models_1.Pais.findByPk(id);
        if (!pais)
            throw new Error("pais no encontrado");
        yield pais.destroy();
        return { message: `pais ${id} eliminada correctamente` };
    }
    catch (error) {
        console.error("Error al eliminar pais:", error);
        throw error;
    }
});
exports.deletePais = deletePais;
