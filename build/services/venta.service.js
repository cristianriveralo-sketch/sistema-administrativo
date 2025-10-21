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
exports.deleteVenta = exports.createVenta = exports.getVentaById = exports.getAllVentas = void 0;
const models_1 = require("../models");
const database_1 = __importDefault(require("../config/database"));
const mapClienteToDTO = (cliente) => ({
    cliente: {
        direccion: cliente.direccion,
        activo: cliente.activo,
    },
    persona: {
        nombre: cliente.persona.nombre,
        apellido: cliente.persona.apellido,
        correo: cliente.persona.email,
        telefono: cliente.persona.telefono,
        genero: cliente.persona.genero,
        ciudad: cliente.persona.ciudad,
        edad: cliente.persona.edad,
        id_pais: cliente.persona.id_pais,
    },
});
const mapArticuloVentaToDTO = (articulo) => ({
    id_axv: articulo.id_axv,
    id_pxc: articulo.id_pxc,
    cantidad_vendida: articulo.cantidad_vendida,
    precio_unitario: Number(articulo.precio_unitario),
    id_venta: articulo.id_venta,
    productoVenta: articulo.productoVenta
        ? {
            id_producto: articulo.productoVenta.id_producto,
            id_talla: articulo.productoVenta.id_talla,
            id_color: articulo.productoVenta.id_color,
            precio: Number(articulo.productoVenta.precio),
            foto: articulo.productoVenta.foto,
            cantidad: articulo.productoVenta.cantidad,
            activo: articulo.productoVenta.activo,
        }
        : undefined,
});
// Mapea una venta Sequelize a DTO
const mapVentaToDTO = (venta) => ({
    id_venta: venta.id_venta,
    id_usuario: venta.id_usuario,
    valor_total: Number(venta.valor_total),
    fecha: venta.fecha,
    articulosVenta: (venta.articulosVenta || []).map(mapArticuloVentaToDTO),
    id_cliente: venta.id_cliente,
    cliente: venta.cliente ? mapClienteToDTO(venta.cliente) : undefined,
});
// Listar todas las ventas
const getAllVentas = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ventas = (yield models_1.Venta.findAll({
            include: [
                {
                    model: models_1.ArticuloVenta,
                    as: "articulosVenta",
                    include: [
                        {
                            model: models_1.ProductoCompleto,
                            as: "productoVenta",
                        },
                    ],
                },
                { model: models_1.Cliente, as: "cliente", include: [{ model: models_1.Persona, as: "persona" }] },
                { model: models_1.Usuario, as: "usuario" },
            ],
            order: [["fecha", "DESC"]],
        }));
        return ventas.map((venta) => mapVentaToDTO(venta));
    }
    catch (error) {
        console.error("Error al obtener ventas:", error);
        throw error;
    }
});
exports.getAllVentas = getAllVentas;
// Obtener una venta por ID
const getVentaById = (id_venta) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const venta = (yield models_1.Venta.findByPk(id_venta, {
            include: [
                {
                    model: models_1.ArticuloVenta,
                    as: "articulosVenta",
                    include: [
                        {
                            model: models_1.ProductoCompleto,
                            as: "productoVenta",
                        },
                    ],
                },
                { model: models_1.Cliente, as: "cliente" },
                { model: models_1.Usuario, as: "usuario" },
            ],
        }));
        if (!venta)
            return null;
        return mapVentaToDTO(venta);
    }
    catch (error) {
        console.error("Error al obtener la venta por ID:", error);
        throw error;
    }
});
exports.getVentaById = getVentaById;
// Crear una venta con sus artículos y actualizar stock
const createVenta = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield database_1.default.transaction();
    try {
        let valor_total = 0;
        // Crear la venta inicialmente con valor_total = 0
        const nuevaVenta = yield models_1.Venta.create({
            id_cliente: data.id_cliente,
            id_usuario: data.id_usuario,
            valor_total: 0,
            fecha: data.fecha,
        }, { transaction });
        // Crear los artículos y actualizar stock
        for (const articulo of data.articulosVenta) {
            const productoCompleto = yield models_1.ProductoCompleto.findByPk(articulo.id_pxc, { transaction });
            if (!productoCompleto)
                throw new Error(`ProductoCompleto ${articulo.id_pxc} no encontrado`);
            // Validar stock suficiente
            if (productoCompleto.cantidad < articulo.cantidad_vendida) {
                throw new Error(`Stock insuficiente para el producto ${articulo.id_pxc}`);
            }
            const precio_unitario = Number(productoCompleto.precio);
            const subtotal = precio_unitario * articulo.cantidad_vendida;
            valor_total += subtotal;
            // Crear ArticuloVenta
            yield models_1.ArticuloVenta.create({
                id_venta: nuevaVenta.id_venta,
                id_pxc: articulo.id_pxc,
                cantidad_vendida: articulo.cantidad_vendida,
                precio_unitario,
            }, { transaction });
            // Actualizar stock en ProductoCompleto
            yield productoCompleto.update({ cantidad: productoCompleto.cantidad - articulo.cantidad_vendida }, { transaction });
            // Actualizar stock en Producto
            const producto = yield models_1.Producto.findByPk(productoCompleto.id_producto, {
                transaction,
            });
            if (producto) {
                yield producto.update({
                    cantidad_stock: producto.cantidad_stock - articulo.cantidad_vendida,
                }, { transaction });
            }
        }
        // Actualizar valor_total de la venta
        yield nuevaVenta.update({ valor_total }, { transaction });
        yield transaction.commit();
        return (yield (0, exports.getVentaById)(nuevaVenta.id_venta));
    }
    catch (error) {
        yield transaction.rollback();
        console.error("Error al crear venta:", error);
        throw error;
    }
});
exports.createVenta = createVenta;
// Eliminar una venta y devolver stock
const deleteVenta = (id_venta) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield database_1.default.transaction();
    try {
        const venta = (yield models_1.Venta.findByPk(id_venta, {
            include: [{ model: models_1.ArticuloVenta, as: "articulosVenta" }],
            transaction,
        }));
        if (!venta)
            throw new Error("Venta no encontrada");
        // Devolver stock
        for (const articulo of venta.articulosVenta || []) {
            // Actualizar stock en ProductoCompleto
            const productoCompleto = yield models_1.ProductoCompleto.findByPk(articulo.id_pxc, { transaction });
            if (!productoCompleto)
                throw new Error(`ProductoCompleto ${articulo.id_pxc} no encontrado`);
            yield productoCompleto.update({ cantidad: productoCompleto.cantidad + articulo.cantidad_vendida }, { transaction });
            // Actualizar stock en Producto
            const producto = yield models_1.Producto.findByPk(productoCompleto.id_producto, {
                transaction,
            });
            if (producto) {
                yield producto.update({
                    cantidad_stock: producto.cantidad_stock + articulo.cantidad_vendida,
                }, { transaction });
            }
        }
        // Borrar la venta
        yield venta.destroy({ transaction });
        yield transaction.commit();
        return { message: `Venta ${id_venta} eliminada correctamente` };
    }
    catch (error) {
        yield transaction.rollback();
        console.error("Error al eliminar venta:", error);
        throw error;
    }
});
exports.deleteVenta = deleteVenta;
