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
exports.deleteColor = exports.updateColor = exports.createColor = exports.getColorById = exports.getAllColors = void 0;
const models_1 = require("../models");
const getAllColors = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield models_1.Color.findAll();
    }
    catch (error) {
        console.error("Error al obtener colores:", error);
        throw error;
    }
});
exports.getAllColors = getAllColors;
const getColorById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield models_1.Color.findByPk(id);
    }
    catch (error) {
        console.error("Error al obtener color por ID:", error);
        throw error;
    }
});
exports.getColorById = getColorById;
const createColor = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield models_1.Color.create(data);
    }
    catch (error) {
        console.error("Error al crear color:", error);
        throw error;
    }
});
exports.createColor = createColor;
const updateColor = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const color = yield models_1.Color.findByPk(id);
        if (!color)
            throw new Error("Color no encontrado");
        return yield color.update(data);
    }
    catch (error) {
        console.error("Error al actualizar color:", error);
        throw error;
    }
});
exports.updateColor = updateColor;
const deleteColor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const color = yield models_1.Color.findByPk(id);
        if (!color)
            throw new Error("Color no encontrado");
        yield color.destroy();
        return { message: `Color ${id} eliminado correctamente` };
    }
    catch (error) {
        console.error("Error al eliminar color:", error);
        throw error;
    }
});
exports.deleteColor = deleteColor;
