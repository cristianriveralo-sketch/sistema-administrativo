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
exports.deleteArticuloVenta = exports.updateArticuloVenta = exports.createArticuloVenta = exports.getArticuloVentaById = exports.getArticuloByVenta = void 0;
const models_1 = require("../models");
const database_1 = __importDefault(require("../config/database"));
// Mapper DTO
const mapArticuloVentaToDTO = (articulo) => ({
    id_axv: articulo.id_axv,
    id_venta: articulo.id_venta,
    id_pxc: articulo.id_pxc,
    cantidad_vendida: articulo.cantidad_vendida,
    precio_unitario: Number(articulo.precio_unitario),
    productoVenta: articulo.productoVenta && {
        id_producto: articulo.productoVenta.id_producto,
        id_talla: articulo.productoVenta.id_talla,
        id_color: articulo.productoVenta.id_color,
        precio: Number(articulo.productoVenta.precio),
        foto: articulo.productoVenta.foto,
        cantidad: articulo.productoVenta.cantidad,
        activo: articulo.productoVenta.activo,
    },
});
// Recalcular valor_total de la venta
const recalcularValorTotalVenta = (id_venta, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    const articulos = yield models_1.ArticuloVenta.findAll({
        where: { id_venta },
        transaction,
    });
    const valor_total = articulos.reduce((sum, a) => sum + Number(a.cantidad_vendida) * Number(a.precio_unitario), 0);
    yield models_1.Venta.update({ valor_total }, { where: { id_venta }, transaction });
});
// Obterner todos los articulos de una venta
const getArticuloByVenta = (id_venta) => __awaiter(void 0, void 0, void 0, function* () {
    const articulos = yield models_1.ArticuloVenta.findAll({
        where: { id_venta },
        include: [{ model: models_1.ProductoCompleto, as: "productoVenta" }],
    });
    return articulos.map(mapArticuloVentaToDTO);
});
exports.getArticuloByVenta = getArticuloByVenta;
// Obtener un artículo por ID
const getArticuloVentaById = (id_axv) => __awaiter(void 0, void 0, void 0, function* () {
    const articulo = yield models_1.ArticuloVenta.findByPk(id_axv, {
        include: [{ model: models_1.ProductoCompleto, as: "productoVenta" }],
    });
    return articulo ? mapArticuloVentaToDTO(articulo) : null;
});
exports.getArticuloVentaById = getArticuloVentaById;
// Crear un artículo en una venta
const createArticuloVenta = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield database_1.default.transaction();
    try {
        const productoCompleto = yield models_1.ProductoCompleto.findByPk(data.id_pxc, { transaction });
        if (!productoCompleto)
            throw new Error("ProductoCompleto no encontrado");
        // Validar stock suficiente
        if (productoCompleto.cantidad < data.cantidad_vendida) {
            throw new Error("Stock insuficiente para realizar la venta");
        }
        const nuevoArticulo = yield models_1.ArticuloVenta.create({
            id_venta: data.id_venta,
            id_pxc: data.id_pxc,
            cantidad_vendida: data.cantidad_vendida,
            precio_unitario: productoCompleto.precio,
        }, { transaction });
        // Disminuir stock en ProductoCompleto
        yield productoCompleto.update({ cantidad: productoCompleto.cantidad - data.cantidad_vendida }, { transaction });
        // Disminuir stock en Producto
        const producto = yield models_1.Producto.findByPk(productoCompleto.id_producto, { transaction });
        if (producto) {
            yield producto.update({ cantidad_stock: producto.cantidad_stock - data.cantidad_vendida }, { transaction });
        }
        // Recalcular valor total
        yield recalcularValorTotalVenta(data.id_venta, transaction);
        yield transaction.commit();
        return mapArticuloVentaToDTO(nuevoArticulo);
    }
    catch (error) {
        yield transaction.rollback();
        throw error;
    }
});
exports.createArticuloVenta = createArticuloVenta;
// Actualizar un artículo de venta
const updateArticuloVenta = (id_axv, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const transaction = yield database_1.default.transaction();
    try {
        const articulo = yield models_1.ArticuloVenta.findByPk(id_axv, { transaction });
        if (!articulo)
            return null;
        // Revertir stock anterior en ProductoCompleto
        const productoAnteriorCompleto = yield models_1.ProductoCompleto.findByPk(articulo.id_pxc, { transaction });
        if (!productoAnteriorCompleto)
            throw new Error("ProductoCompleto anterior no encontrado");
        yield productoAnteriorCompleto.update({ cantidad: productoAnteriorCompleto.cantidad + articulo.cantidad_vendida }, { transaction });
        // Revertir stock anterior en Producto
        const productoAnterior = yield models_1.Producto.findByPk(productoAnteriorCompleto.id_producto, { transaction });
        if (productoAnterior) {
            yield productoAnterior.update({ cantidad_stock: productoAnterior.cantidad_stock + articulo.cantidad_vendida }, { transaction });
        }
        // Buscar producto nuevo (si cambia id_pxc, usarlo)
        const productoNuevoCompleto = yield models_1.ProductoCompleto.findByPk((_a = data.id_pxc) !== null && _a !== void 0 ? _a : articulo.id_pxc, { transaction });
        if (!productoNuevoCompleto)
            throw new Error("ProductoCompleto nuevo no encontrado");
        const nuevaCantidad = (_b = data.cantidad_vendida) !== null && _b !== void 0 ? _b : articulo.cantidad_vendida;
        // Validar stock suficiente
        if (productoNuevoCompleto.cantidad < nuevaCantidad) {
            throw new Error("Stock insuficiente para actualizar la venta");
        }
        // Actualizar artículo
        yield articulo.update(Object.assign(Object.assign({}, data), { cantidad_vendida: nuevaCantidad, precio_unitario: productoNuevoCompleto.precio }), { transaction });
        // Disminuir stock en ProductoCompleto
        yield productoNuevoCompleto.update({ cantidad: productoNuevoCompleto.cantidad - nuevaCantidad }, { transaction });
        // Disminuir stock en Producto
        const productoNuevo = yield models_1.Producto.findByPk(productoNuevoCompleto.id_producto, { transaction });
        if (productoNuevo) {
            yield productoNuevo.update({ cantidad_stock: productoNuevo.cantidad_stock - nuevaCantidad }, { transaction });
        }
        // Recalcular valor total
        yield recalcularValorTotalVenta(articulo.id_venta, transaction);
        yield transaction.commit();
        return mapArticuloVentaToDTO(articulo);
    }
    catch (error) {
        yield transaction.rollback();
        throw error;
    }
});
exports.updateArticuloVenta = updateArticuloVenta;
// Eliminar un artículo de venta
const deleteArticuloVenta = (id_axv) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield database_1.default.transaction();
    try {
        const articulo = yield models_1.ArticuloVenta.findByPk(id_axv, { transaction });
        if (!articulo)
            throw new Error("Artículo de venta no encontrado");
        // Revertir stock en ProductoCompleto
        const productoCompleto = yield models_1.ProductoCompleto.findByPk(articulo.id_pxc, { transaction });
        if (productoCompleto) {
            yield productoCompleto.update({ cantidad: productoCompleto.cantidad + articulo.cantidad_vendida }, { transaction });
            // Revertir stock en Producto
            const producto = yield models_1.Producto.findByPk(productoCompleto.id_producto, { transaction });
            if (producto) {
                yield producto.update({ cantidad_stock: producto.cantidad_stock + articulo.cantidad_vendida }, { transaction });
            }
        }
        const id_venta = articulo.id_venta;
        yield articulo.destroy({ transaction });
        // Recalcular valor total
        yield recalcularValorTotalVenta(id_venta, transaction);
        yield transaction.commit();
        return { message: `Artículo de venta ${id_axv} eliminado correctamente` };
    }
    catch (error) {
        yield transaction.rollback();
        throw error;
    }
});
exports.deleteArticuloVenta = deleteArticuloVenta;
