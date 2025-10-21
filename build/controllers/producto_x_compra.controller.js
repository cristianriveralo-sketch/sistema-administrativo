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
exports.deleteProductoXCompra = exports.updateProductoXCompra = exports.createProductoXCompra = exports.getProductoXCompraById = exports.getIdsAxCByCompra = exports.getAllProductoXCompras = void 0;
const articuloService = __importStar(require("../services/producto_x_compra.service"));
// Listar todos los artículos de una compra (por id_compra_inventario)
const getAllProductoXCompras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_compra_inventario } = req.query;
        if (!id_compra_inventario) {
            return res.status(400).json({ message: "Falta id_compra_inventario" });
        }
        const articulos = yield articuloService.getArticulosByCompra(Number(id_compra_inventario));
        res.json(articulos);
    }
    catch (error) {
        console.error("Error al obtener artículos:", error);
        res.status(500).json({ message: "Error al obtener artículos" });
    }
});
exports.getAllProductoXCompras = getAllProductoXCompras;
// Obtener todos los id_axc por id_compra_inventario
const getIdsAxCByCompra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_compra_inventario } = req.params;
        const ids = yield articuloService.getIdsAxCByCompra(Number(id_compra_inventario));
        res.json(ids);
    }
    catch (error) {
        console.error("Error al obtener IDs:", error);
        res.status(500).json({ message: "Error al obtener IDs" });
    }
});
exports.getIdsAxCByCompra = getIdsAxCByCompra;
// Obtener un artículo por ID
const getProductoXCompraById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const articulo = yield articuloService.getArticuloCompraById(Number(id));
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
exports.getProductoXCompraById = getProductoXCompraById;
// Crear un nuevo artículo en la compra
const createProductoXCompra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nuevoArticulo = yield articuloService.createArticuloCompra(req.body);
        res.status(201).json({ message: "Artículo creado correctamente", data: nuevoArticulo });
    }
    catch (error) {
        console.error("Error al crear artículo:", error);
        res.status(500).json({ message: "Error al crear artículo" });
    }
});
exports.createProductoXCompra = createProductoXCompra;
// Actualizar un artículo de la compra
const updateProductoXCompra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const articuloActualizado = yield articuloService.updateArticuloCompra(Number(id), req.body);
        if (!articuloActualizado) {
            return res.status(404).json({ message: "Artículo no encontrado para actualizar" });
        }
        res.json({ message: "Artículo actualizado correctamente", data: articuloActualizado });
    }
    catch (error) {
        console.error("Error al actualizar artículo:", error);
        res.status(500).json({ message: "Error al actualizar artículo" });
    }
});
exports.updateProductoXCompra = updateProductoXCompra;
// Eliminar un artículo de la compra
const deleteProductoXCompra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield articuloService.deleteArticuloCompra(Number(id));
        res.json(result);
    }
    catch (error) {
        console.error("Error al eliminar artículo:", error);
        res.status(500).json({ message: "Error al eliminar artículo" });
    }
});
exports.deleteProductoXCompra = deleteProductoXCompra;
