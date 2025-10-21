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
exports.deleteCategoria = exports.updateCategoria = exports.createCategoria = exports.getCategoriaById = exports.getAllCategorias = void 0;
const models_1 = require("../models");
const getAllCategorias = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoria = yield models_1.Categoria.findAll();
        return categoria;
    }
    catch (error) {
        console.error("Error al obtener categorías:", error);
        throw error;
    }
});
exports.getAllCategorias = getAllCategorias;
const getCategoriaById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoria = yield models_1.Categoria.findByPk(id);
        return categoria;
    }
    catch (error) {
        console.error("Error al obtener categoría por ID:", error);
        throw error;
    }
});
exports.getCategoriaById = getCategoriaById;
const createCategoria = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return models_1.Categoria.create(data);
    }
    catch (error) {
        console.error("Error al crear categoría:", error);
        throw error;
    }
});
exports.createCategoria = createCategoria;
const updateCategoria = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoria = yield models_1.Categoria.findByPk(id);
        if (!categoria)
            throw new Error("Categoría no encontrada");
        return categoria.update(data);
    }
    catch (error) {
        console.error("Error al actualizar categoría:", error);
        throw error;
    }
});
exports.updateCategoria = updateCategoria;
const deleteCategoria = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoria = yield models_1.Categoria.findByPk(id);
        if (!categoria)
            throw new Error("Categoría no encontrada");
        yield categoria.destroy();
        return { message: `Categoría ${id} eliminada correctamente` };
    }
    catch (error) {
        console.error("Error al eliminar categoría:", error);
        throw error;
    }
});
exports.deleteCategoria = deleteCategoria;
