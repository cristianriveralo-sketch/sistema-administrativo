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
exports.deletetalla = exports.updatetalla = exports.createtalla = exports.gettallaById = exports.getAlltallas = void 0;
const models_1 = require("../models");
const getAlltallas = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield models_1.Talla.findAll();
    }
    catch (error) {
        console.error("Error al obtener talla:", error);
        throw error;
    }
});
exports.getAlltallas = getAlltallas;
const gettallaById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield models_1.Talla.findByPk(id);
    }
    catch (error) {
        console.error("Error al obtener talla por ID:", error);
        throw error;
    }
});
exports.gettallaById = gettallaById;
const createtalla = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield models_1.Talla.create(data);
    }
    catch (error) {
        console.error("Error al crear talla:", error);
        throw error;
    }
});
exports.createtalla = createtalla;
const updatetalla = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const talla = yield models_1.Talla.findByPk(id);
        if (!talla)
            throw new Error("talla no encontrado");
        return yield talla.update(data);
    }
    catch (error) {
        console.error("Error al actualizar talla:", error);
        throw error;
    }
});
exports.updatetalla = updatetalla;
const deletetalla = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const talla = yield models_1.Talla.findByPk(id);
        if (!talla)
            throw new Error("talla no encontrado");
        yield talla.destroy();
        return { message: `talla ${id} eliminado correctamente` };
    }
    catch (error) {
        console.error("Error al eliminar talla:", error);
        throw error;
    }
});
exports.deletetalla = deletetalla;
