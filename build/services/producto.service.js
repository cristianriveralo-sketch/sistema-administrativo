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
exports.deleteProducto = exports.updateProducto = exports.createProducto = exports.getProductoById = exports.getAllProductos = void 0;
const models_1 = require("../models");
const database_1 = __importDefault(require("../config/database"));
const getAllProductos = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield models_1.Producto.findAll({
            include: [{ model: models_1.Categoria, as: "categoria" }],
        });
    }
    catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
    }
});
exports.getAllProductos = getAllProductos;
const getProductoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield models_1.Producto.findByPk(id, {
            include: [{ model: models_1.Categoria, as: "categoria" }],
        });
    }
    catch (error) {
        console.error("Error al obtener producto por ID:", error);
        throw error;
    }
});
exports.getProductoById = getProductoById;
const createProducto = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield database_1.default.transaction();
    try {
        const producto = yield models_1.Producto.create(data, { transaction });
        yield transaction.commit();
        return producto;
    }
    catch (error) {
        yield transaction.rollback();
        console.error("Error al crear producto:", error);
        throw error;
    }
});
exports.createProducto = createProducto;
const updateProducto = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const producto = yield models_1.Producto.findByPk(id);
        if (!producto)
            throw new Error("Producto no encontrado");
        // Solo valida categoría si viene en el body
        if (data.id_categoria !== undefined) {
            const categoria = yield models_1.Categoria.findByPk(data.id_categoria);
            if (!categoria)
                throw new Error("Categoría no encontrada");
        }
        return producto.update(data);
    }
    catch (error) {
        console.error("Error al actualizar producto:", error);
        throw error;
    }
});
exports.updateProducto = updateProducto;
const deleteProducto = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const producto = yield models_1.Producto.findByPk(id);
        if (!producto)
            throw new Error("Producto no encontrado");
        yield producto.destroy();
        return { message: `Producto ${id} eliminado correctamente` };
    }
    catch (error) {
        console.error("Error al eliminar producto:", error);
        throw error;
    }
});
exports.deleteProducto = deleteProducto;
