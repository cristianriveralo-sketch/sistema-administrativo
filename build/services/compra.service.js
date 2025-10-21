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
exports.deleteCompra = exports.createCompra = exports.getCompraById = exports.getAllCompras = void 0;
const models_1 = require("../models");
const database_1 = __importDefault(require("../config/database"));
const mapProveedorToDTO = (proveedor) => {
    var _a;
    return ({
        proveedor: {
            razon_social: proveedor.razon_social,
            marca: proveedor.marca,
        },
        persona: {
            id_persona: (_a = proveedor.persona) === null || _a === void 0 ? void 0 : _a.id_persona,
        },
    });
};
const mapArticuloCompraToDTO = (articulo) => ({
    id_axc: articulo.id_axc,
    id_pxc: articulo.id_pxc,
    cantidad: articulo.cantidad,
    precio_unitario: Number(articulo.precio_unitario),
    id_compra_inventario: articulo.id_compra_inventario,
    productoCompra: articulo.productoCompra
        ? {
            id_producto: articulo.productoCompra.id_producto,
            id_talla: articulo.productoCompra.id_talla,
            id_color: articulo.productoCompra.id_color,
            precio: Number(articulo.productoCompra.precio),
            foto: articulo.productoCompra.foto,
            cantidad: articulo.productoCompra.cantidad,
            activo: articulo.productoCompra.activo,
        }
        : undefined,
});
const mapCompraToDTO = (compra) => ({
    id_compra_inventario: compra.id_compra_inventario,
    id_proveedor: compra.id_proveedor,
    id_usuario: compra.id_usuario,
    valor_total: Number(compra.valor_total),
    fecha: compra.fecha,
    articulosCompra: (compra.articulosCompra || []).map(mapArticuloCompraToDTO),
    proveedor: compra.proveedor ? mapProveedorToDTO(compra.proveedor) : undefined,
});
// Listar todas las compras
const getAllCompras = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const compras = yield models_1.Compra.findAll({
            include: [
                {
                    model: models_1.ArticuloCompra,
                    as: "articulosCompra",
                    include: [
                        {
                            model: models_1.ProductoCompleto,
                            as: "productoCompra",
                        },
                    ],
                },
                {
                    model: models_1.Proveedor,
                    as: "proveedor",
                    include: [{ model: models_1.Persona, as: "persona" }],
                },
                {
                    model: models_1.Usuario,
                    as: "usuario",
                    include: [{ model: models_1.Persona, as: "persona" }],
                },
            ],
            order: [["fecha", "DESC"]],
        });
        // si aún no ves productoCompra, revisa tu DTO
        return compras.map((compra) => mapCompraToDTO(compra));
    }
    catch (error) {
        console.error("Error al obtener compras:", error);
        throw error;
    }
});
exports.getAllCompras = getAllCompras;
// Obtener una compra por ID
const getCompraById = (id_compra_inventario) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const compra = (yield models_1.Compra.findByPk(id_compra_inventario, {
            include: [
                {
                    model: models_1.ArticuloCompra,
                    as: "articulosCompra",
                    include: [
                        {
                            model: models_1.ProductoCompleto,
                            as: "productoCompra",
                        },
                    ],
                },
                {
                    model: models_1.Proveedor,
                    as: "proveedor",
                    include: [{ model: models_1.Persona, as: "persona" }],
                },
                {
                    model: models_1.Usuario,
                    as: "usuario",
                    include: [{ model: models_1.Persona, as: "persona" }],
                },
            ],
        }));
        if (!compra)
            return null;
        return mapCompraToDTO(compra);
    }
    catch (error) {
        console.error("Error al obtener compra por ID:", error);
        throw error;
    }
});
exports.getCompraById = getCompraById;
// Crear una compra con sus artículos y actualizar stock
const createCompra = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield database_1.default.transaction();
    try {
        let valor_total = 0;
        // Crear la compra inicialmente con valor_total = 0
        const nuevaCompra = yield models_1.Compra.create({
            id_proveedor: data.id_proveedor,
            id_usuario: data.id_usuario,
            valor_total: 0,
            fecha: data.fecha,
        }, { transaction });
        // Crear artículos y actualizar stock
        for (const articulo of data.articulosCompra) {
            const productoCompleto = yield models_1.ProductoCompleto.findByPk(articulo.id_pxc, { transaction });
            if (!productoCompleto)
                throw new Error(`ProductoCompleto ${articulo.id_pxc} no encontrado`);
            // Tomar el precio desde ProductoCompleto
            const precio_unitario = Number(productoCompleto.precio);
            const subtotal = precio_unitario * articulo.cantidad;
            valor_total += subtotal;
            // Crear ArticuloCompra
            yield models_1.ArticuloCompra.create({
                id_compra_inventario: nuevaCompra.id_compra_inventario,
                id_pxc: articulo.id_pxc,
                cantidad: articulo.cantidad,
                precio_unitario,
            }, { transaction });
            // Actualizar stock en ProductoCompleto (se suma al stock)
            yield productoCompleto.update({ cantidad: productoCompleto.cantidad + articulo.cantidad }, { transaction });
            // Actualizar stock en Producto
            const producto = yield models_1.Producto.findByPk(productoCompleto.id_producto, { transaction });
            if (producto) {
                yield producto.update({ cantidad_stock: producto.cantidad_stock + articulo.cantidad }, { transaction });
            }
        }
        // Actualizar valor_total
        yield nuevaCompra.update({ valor_total }, { transaction });
        yield transaction.commit();
        return (yield (0, exports.getCompraById)(nuevaCompra.id_compra_inventario));
    }
    catch (error) {
        yield transaction.rollback();
        console.error("Error al crear compra:", error);
        throw error;
    }
});
exports.createCompra = createCompra;
// Eliminar compra y restar stock
const deleteCompra = (id_compra_inventario) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield database_1.default.transaction();
    try {
        const compra = (yield models_1.Compra.findByPk(id_compra_inventario, {
            include: [{ model: models_1.ArticuloCompra, as: "articulosCompra" }],
            transaction,
        }));
        if (!compra)
            throw new Error("Compra no encontrada");
        // Restar stock (reversar la compra)
        for (const articulo of compra.articulosCompra || []) {
            const productoCompleto = yield models_1.ProductoCompleto.findByPk(articulo.id_pxc, { transaction });
            if (!productoCompleto)
                throw new Error(`ProductoCompleto ${articulo.id_pxc} no encontrado`);
            yield productoCompleto.update({ cantidad: productoCompleto.cantidad - articulo.cantidad }, { transaction });
            const producto = yield models_1.Producto.findByPk(productoCompleto.id_producto, { transaction });
            if (producto) {
                yield producto.update({ cantidad_stock: producto.cantidad_stock - articulo.cantidad }, { transaction });
            }
        }
        // Borrar compra
        yield compra.destroy({ transaction });
        yield transaction.commit();
        return { message: `Compra ${id_compra_inventario} eliminada correctamente` };
    }
    catch (error) {
        yield transaction.rollback();
        console.error("Error al eliminar compra:", error);
        throw error;
    }
});
exports.deleteCompra = deleteCompra;
