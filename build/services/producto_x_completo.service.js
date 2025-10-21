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
exports.deleteProductoCompleto = exports.updateProductoCompleto = exports.createProductoCompleto = exports.getProductoCompletoById = exports.getAllProductoCompleto = void 0;
const models_1 = require("../models");
const database_1 = __importDefault(require("../config/database"));
const getAllProductoCompleto = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield models_1.ProductoCompleto.findAll({
            include: [
                {
                    model: models_1.Producto,
                    as: "producto",
                    include: [{ model: models_1.Categoria, as: "categoria" }],
                },
                { model: models_1.Talla, as: "talla" },
                { model: models_1.Color, as: "color" },
            ],
        });
    }
    catch (error) {
        console.error("Error al obtener productos completos:", error);
        throw error;
    }
});
exports.getAllProductoCompleto = getAllProductoCompleto;
const getProductoCompletoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield models_1.ProductoCompleto.findByPk(id, {
            include: [
                {
                    model: models_1.Producto,
                    as: "producto",
                    include: [{ model: models_1.Categoria, as: "categoria" }],
                },
                { model: models_1.Talla, as: "talla" },
                { model: models_1.Color, as: "color" },
            ],
        });
    }
    catch (error) {
        console.error("Error al obtener producto completo por ID:", error);
        throw error;
    }
});
exports.getProductoCompletoById = getProductoCompletoById;
const createProductoCompleto = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield database_1.default.transaction();
    try {
        const productoCompleto = yield models_1.ProductoCompleto.create(data, {
            transaction,
        });
        // Buscar producto asociado
        const producto = yield models_1.Producto.findByPk(data.id_producto, { transaction });
        if (!producto)
            throw new Error("Producto no encontrado");
        // Aumentar el stock
        producto.cantidad_stock += data.cantidad;
        yield producto.save({ transaction });
        yield transaction.commit();
        return productoCompleto;
    }
    catch (error) {
        yield transaction.rollback();
        console.error("Error al crear producto completo:", error);
        throw error;
    }
});
exports.createProductoCompleto = createProductoCompleto;
const updateProductoCompleto = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield database_1.default.transaction();
    try {
        const productoCompleto = yield models_1.ProductoCompleto.findByPk(id, { transaction });
        if (!productoCompleto)
            throw new Error("Producto completo no encontrado");
        // Verificar que no cambie el id_producto
        if (data.id_producto &&
            data.id_producto !== productoCompleto.id_producto) {
            throw new Error("No se permite cambiar el id_producto en un producto completo existente");
        }
        // Buscar producto asociado
        const producto = yield models_1.Producto.findByPk(productoCompleto.id_producto, { transaction });
        if (!producto)
            throw new Error("Producto no encontrado");
        // Ajustar stock si cambia la cantidad
        if (data.cantidad !== undefined) {
            const diferencia = data.cantidad - productoCompleto.cantidad;
            producto.cantidad_stock += diferencia;
            yield producto.save({ transaction });
        }
        yield productoCompleto.update(data, { transaction });
        yield transaction.commit();
        return productoCompleto;
    }
    catch (error) {
        yield transaction.rollback();
        console.error("Error al actualizar producto completo:", error);
        throw error;
    }
});
exports.updateProductoCompleto = updateProductoCompleto;
const deleteProductoCompleto = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield database_1.default.transaction();
    try {
        const productoCompleto = yield models_1.ProductoCompleto.findByPk(id, { transaction });
        if (!productoCompleto)
            throw new Error("Producto completo no encontrado");
        // Buscar producto asociado
        const producto = yield models_1.Producto.findByPk(productoCompleto.id_producto, { transaction });
        if (!producto)
            throw new Error("Producto no encontrado");
        // Restar stock
        producto.cantidad_stock -= productoCompleto.cantidad;
        yield producto.save({ transaction });
        yield productoCompleto.destroy({ transaction });
        yield transaction.commit();
        return { message: "Producto completo eliminado correctamente" };
    }
    catch (error) {
        yield transaction.rollback();
        console.error("Error al eliminar producto completo:", error);
        throw error;
    }
});
exports.deleteProductoCompleto = deleteProductoCompleto;
