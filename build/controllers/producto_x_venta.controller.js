"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.deleteProductoXVenta = exports.updateProductoXVenta = exports.createProductoXVenta = exports.getProductoXVentaById = exports.getAllProductoXVentas = void 0;
const articuloVenta = __importStar(require("../services/producto_x_venta.service"));
// Obtener todos los artículos de una venta
const getAllProductoXVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_venta } = req.query;
        if (!id_venta) {
            return res.status(400).json({ message: "Falta id_venta" });
        }
        const articulos = yield articuloVenta.getArticuloByVenta(Number(id_venta));
        res.json(articulos);
    }
    catch (error) {
        console.error("Error al obtener artículos:", error);
        res.status(500).json({ message: "Error al obtener artículos" });
    }
});
exports.getAllProductoXVentas = getAllProductoXVentas;
// Obtener un artículo de venta por ID
const getProductoXVentaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const articulo = yield articuloVenta.getArticuloVentaById(Number(id));
        if (!articulo) {
            return res.status(404).json({ message: "Artículo no encontrado" });
        }
        res.json(articulo);
    }
    catch (error) {
        console.error("Error al obtener artículo:", error);
        res.status(500).json({ message: "Error al obtener artículo" });
    }
});
exports.getProductoXVentaById = getProductoXVentaById;
// Crear un artículo de venta
const createProductoXVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nuevoArticulo = yield articuloVenta.createArticuloVenta(req.body);
        res.status(201).json({
            message: "ProductoXVenta creado correctamente",
            data: nuevoArticulo,
        });
    }
    catch (error) {
        console.error("Error al crear artículo de venta:", error);
        res.status(500).json({ message: error.message || "Error al crear artículo" });
    }
});
exports.createProductoXVenta = createProductoXVenta;
// Actualizar un artículo de venta
const updateProductoXVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const articulo = yield articuloVenta.updateArticuloVenta(Number(id), req.body);
        if (!articulo) {
            return res.status(404).json({ message: "Artículo no encontrado" });
        }
        res.json({
            message: `ProductoXVenta ${id} actualizado correctamente`,
            data: articulo,
        });
    }
    catch (error) {
        console.error("Error al actualizar artículo de venta:", error);
        res.status(500).json({ message: error.message || "Error al actualizar artículo" });
    }
});
exports.updateProductoXVenta = updateProductoXVenta;
// Eliminar un artículo de venta
const deleteProductoXVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield articuloVenta.deleteArticuloVenta(Number(id));
        res.json(result);
    }
    catch (error) {
        console.error("Error al eliminar artículo de venta:", error);
        res.status(500).json({ message: error.message || "Error al eliminar artículo" });
    }
});
exports.deleteProductoXVenta = deleteProductoXVenta;
