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
exports.deleteProductoCompleto = exports.updateProductoCompleto = exports.createProductoCompleto = exports.getProductoCompletoById = exports.getAllProductoCompletos = void 0;
const productoCompletoService = __importStar(require("../services/producto_x_completo.service"));
const s3_1 = require("../utils/s3");
const models_1 = require("../models");
const getAllProductoCompletos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productosCompletos = yield productoCompletoService.getAllProductoCompleto();
        res.json(productosCompletos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener productos completos" });
    }
});
exports.getAllProductoCompletos = getAllProductoCompletos;
const getProductoCompletoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const productoCompleto = yield productoCompletoService.getProductoCompletoById(Number(id));
        if (!productoCompleto)
            return res.status(404).json({ message: "ProductoCompleto no encontrado" });
        res.json(productoCompleto);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener producto completo" });
    }
});
exports.getProductoCompletoById = getProductoCompletoById;
const createProductoCompleto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validar existencia del producto ANTES de llamar al service
        const producto = yield models_1.Producto.findByPk(req.body.id_producto);
        console.log(req.body);
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        let fotoUrl = null;
        if (req.file) {
            const result = yield (0, s3_1.uploadToS3)(req.file.buffer, req.file.originalname, req.file.mimetype);
            fotoUrl = result.Location;
        }
        const data = Object.assign(Object.assign({}, req.body), { id_producto: Number(req.body.id_producto), id_talla: Number(req.body.id_talla), id_color: Number(req.body.id_color), precio: Number(req.body.precio), cantidad: Number(req.body.cantidad), activo: req.body.activo === "true" || req.body.activo === true, foto: fotoUrl });
        const productoCompleto = yield productoCompletoService.createProductoCompleto(data);
        res.status(201).json(productoCompleto);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear producto completo" });
    }
});
exports.createProductoCompleto = createProductoCompleto;
const updateProductoCompleto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const productoCompleto = yield productoCompletoService.updateProductoCompleto(Number(id), req.body);
        res.json(productoCompleto);
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message });
    }
});
exports.updateProductoCompleto = updateProductoCompleto;
const deleteProductoCompleto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const productoCompleto = yield productoCompletoService.deleteProductoCompleto(Number(id));
        res.json(productoCompleto);
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message });
    }
});
exports.deleteProductoCompleto = deleteProductoCompleto;
