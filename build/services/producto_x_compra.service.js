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
exports.deleteArticuloCompra = exports.updateArticuloCompra = exports.createArticuloCompra = exports.getArticuloCompraById = exports.getIdsAxCByCompra = exports.getArticulosByCompra = void 0;
const models_1 = require("../models");
const database_1 = __importDefault(require("../config/database"));
// Mapper DTO
const mapArticuloCompraToDTO = (articulo) => ({
    id_axc: articulo.id_axc,
    id_compra_inventario: articulo.id_compra_inventario,
    id_pxc: articulo.id_pxc,
    cantidad: articulo.cantidad,
    precio_unitario: Number(articulo.precio_unitario),
    productoCompra: articulo.productoCompra && {
        id_producto: articulo.productoCompra.id_producto,
        id_talla: articulo.productoCompra.id_talla,
        id_color: articulo.productoCompra.id_color,
        precio: Number(articulo.productoCompra.precio),
        foto: articulo.productoCompra.foto,
        cantidad: articulo.productoCompra.cantidad,
        activo: articulo.productoCompra.activo,
    },
});
// Recalcular valor_total de la compra
const recalcularValorTotal = (id_compra_inventario, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    const articulos = yield models_1.ArticuloCompra.findAll({
        where: { id_compra_inventario },
        transaction,
    });
    const valor_total = articulos.reduce((sum, a) => sum + Number(a.cantidad) * Number(a.precio_unitario), 0);
    yield models_1.Compra.update({ valor_total }, { where: { id_compra_inventario }, transaction });
});
// Listar todos los artículos de una compra
const getArticulosByCompra = (id_compra_inventario) => __awaiter(void 0, void 0, void 0, function* () {
    const articulos = yield models_1.ArticuloCompra.findAll({
        where: { id_compra_inventario },
        include: [{ model: models_1.ProductoCompleto, as: "productoCompra" }],
    });
    return articulos.map(mapArticuloCompraToDTO);
});
exports.getArticulosByCompra = getArticulosByCompra;
// Obtener todos los id_axc de una compra
const getIdsAxCByCompra = (id_compra_inventario) => __awaiter(void 0, void 0, void 0, function* () {
    const articulos = yield models_1.ArticuloCompra.findAll({
        where: { id_compra_inventario },
        attributes: ["id_axc"],
    });
    return articulos.map((a) => a.id_axc);
});
exports.getIdsAxCByCompra = getIdsAxCByCompra;
// Obtener un artículo por ID
const getArticuloCompraById = (id_axc) => __awaiter(void 0, void 0, void 0, function* () {
    const articulo = yield models_1.ArticuloCompra.findByPk(id_axc, {
        include: [{ model: models_1.ProductoCompleto, as: "productoCompra" }],
    });
    return articulo ? mapArticuloCompraToDTO(articulo) : null;
});
exports.getArticuloCompraById = getArticuloCompraById;
// Crear un artículo en una compra
const createArticuloCompra = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield database_1.default.transaction();
    try {
        const productoCompleto = yield models_1.ProductoCompleto.findByPk(data.id_pxc, { transaction });
        if (!productoCompleto)
            throw new Error("ProductoCompleto no encontrado");
        const nuevoArticulo = yield models_1.ArticuloCompra.create({
            id_compra_inventario: data.id_compra_inventario,
            id_pxc: data.id_pxc,
            cantidad: data.cantidad,
            precio_unitario: productoCompleto.precio,
        }, { transaction });
        // Aumentar stock en ProductoCompleto
        yield productoCompleto.update({ cantidad: productoCompleto.cantidad + data.cantidad }, { transaction });
        // Aumentar stock en Producto (usando id_producto del productoCompleto)
        const producto = yield models_1.Producto.findByPk(productoCompleto.id_producto, { transaction });
        if (producto) {
            yield producto.update({ cantidad_stock: producto.cantidad_stock + data.cantidad }, { transaction });
        }
        // Recalcular valor total
        yield recalcularValorTotal(data.id_compra_inventario, transaction);
        yield transaction.commit();
        return mapArticuloCompraToDTO(nuevoArticulo);
    }
    catch (error) {
        yield transaction.rollback();
        throw error;
    }
});
exports.createArticuloCompra = createArticuloCompra;
// Actualizar un artículo de compra
const updateArticuloCompra = (id_axc, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const transaction = yield database_1.default.transaction();
    try {
        const articulo = yield models_1.ArticuloCompra.findByPk(id_axc, { transaction });
        if (!articulo)
            return null;
        // Revertir stock anterior en ProductoCompleto
        const productoAnteriorCompleto = yield models_1.ProductoCompleto.findByPk(articulo.id_pxc, { transaction });
        if (!productoAnteriorCompleto)
            throw new Error("ProductoCompleto anterior no encontrado");
        yield productoAnteriorCompleto.update({ cantidad: productoAnteriorCompleto.cantidad - articulo.cantidad }, { transaction });
        // Revertir stock anterior en Producto
        const productoAnterior = yield models_1.Producto.findByPk(productoAnteriorCompleto.id_producto, { transaction });
        if (productoAnterior) {
            yield productoAnterior.update({ cantidad_stock: productoAnterior.cantidad_stock - articulo.cantidad }, { transaction });
        }
        // Buscar producto nuevo (si cambia id_pxc, usarlo)
        const productoNuevoCompleto = yield models_1.ProductoCompleto.findByPk((_a = data.id_pxc) !== null && _a !== void 0 ? _a : articulo.id_pxc, { transaction });
        if (!productoNuevoCompleto)
            throw new Error("ProductoCompleto nuevo no encontrado");
        const nuevaCantidad = (_b = data.cantidad) !== null && _b !== void 0 ? _b : articulo.cantidad;
        // Actualizar artículo
        yield articulo.update(Object.assign(Object.assign({}, data), { cantidad: nuevaCantidad, precio_unitario: productoNuevoCompleto.precio }), { transaction });
        // Aumentar stock en ProductoCompleto
        yield productoNuevoCompleto.update({ cantidad: productoNuevoCompleto.cantidad + nuevaCantidad }, { transaction });
        // Aumentar stock en Producto
        const productoNuevo = yield models_1.Producto.findByPk(productoNuevoCompleto.id_producto, { transaction });
        if (productoNuevo) {
            yield productoNuevo.update({ cantidad_stock: productoNuevo.cantidad_stock + nuevaCantidad }, { transaction });
        }
        // Recalcular valor total
        yield recalcularValorTotal(articulo.id_compra_inventario, transaction);
        yield transaction.commit();
        return mapArticuloCompraToDTO(articulo);
    }
    catch (error) {
        yield transaction.rollback();
        throw error;
    }
});
exports.updateArticuloCompra = updateArticuloCompra;
// Eliminar un artículo de compra
const deleteArticuloCompra = (id_axc) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield database_1.default.transaction();
    try {
        const articulo = yield models_1.ArticuloCompra.findByPk(id_axc, { transaction });
        if (!articulo)
            throw new Error("Artículo de compra no encontrado");
        // Revertir stock en ProductoCompleto
        const productoCompleto = yield models_1.ProductoCompleto.findByPk(articulo.id_pxc, { transaction });
        if (productoCompleto) {
            yield productoCompleto.update({ cantidad: productoCompleto.cantidad - articulo.cantidad }, { transaction });
            // Revertir stock en Producto
            const producto = yield models_1.Producto.findByPk(productoCompleto.id_producto, { transaction });
            if (producto) {
                yield producto.update({ cantidad_stock: producto.cantidad_stock - articulo.cantidad }, { transaction });
            }
        }
        const id_compra_inventario = articulo.id_compra_inventario;
        yield articulo.destroy({ transaction });
        // Recalcular valor total
        yield recalcularValorTotal(id_compra_inventario, transaction);
        yield transaction.commit();
        return { message: `Artículo de compra ${id_axc} eliminado correctamente` };
    }
    catch (error) {
        yield transaction.rollback();
        throw error;
    }
});
exports.deleteArticuloCompra = deleteArticuloCompra;
