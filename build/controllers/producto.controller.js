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
exports.deleteProducto = exports.updateProducto = exports.createProducto = exports.getProductoById = exports.getAllProductos = void 0;
const productoService = __importStar(require("../services/producto.service"));
// todo: Obtener todos los productos
const getAllProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield productoService.getAllProductos();
        res.json(productos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener productos" });
    }
});
exports.getAllProductos = getAllProductos;
// todo: Obtener producto por ID
const getProductoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const producto = yield productoService.getProductoById(Number(id));
        if (!producto)
            return res.status(404).json({ message: "Producto no encontrado" });
        res.json(producto);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener producto" });
    }
});
exports.getProductoById = getProductoById;
// todo: Crear nuevo producto
const createProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const producto = yield productoService.createProducto(req.body);
        res.status(201).json(producto);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear producto" });
    }
});
exports.createProducto = createProducto;
// todo: Actualizar producto
const updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const producto = yield productoService.updateProducto(Number(id), req.body);
        res.json(producto);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar producto" });
    }
});
exports.updateProducto = updateProducto;
// todo: Eliminar producto
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield productoService.deleteProducto(Number(id));
        res.json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar producto" });
    }
});
exports.deleteProducto = deleteProducto;
