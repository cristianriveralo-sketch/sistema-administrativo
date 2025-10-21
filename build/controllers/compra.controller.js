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
exports.deleteCompra = exports.createCompra = exports.getCompraById = exports.getAllCompras = void 0;
const compraService = __importStar(require("../services/compra.service"));
// Obtener todas las compras
const getAllCompras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const compras = yield compraService.getAllCompras();
        res.json(compras);
    }
    catch (error) {
        console.error("Error al obtener compras:", error);
        res.status(500).json({ message: "Error al obtener compras" });
    }
});
exports.getAllCompras = getAllCompras;
// Obtener compra por ID
const getCompraById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const compra = yield compraService.getCompraById(Number(id));
        if (!compra)
            return res.status(404).json({ message: "Compra no encontrada" });
        res.json(compra);
    }
    catch (error) {
        console.error("Error al obtener compra:", error);
        res.status(500).json({ message: "Error al obtener compra" });
    }
});
exports.getCompraById = getCompraById;
// Crear nueva compra
const createCompra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const compra = yield compraService.createCompra(req.body);
        res.status(201).json(compra);
    }
    catch (error) {
        console.error("Error al crear compra:", error);
        res.status(500).json({ message: "Error al crear compra" });
    }
});
exports.createCompra = createCompra;
// Eliminar compra
const deleteCompra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield compraService.deleteCompra(Number(id));
        res.json({ message: "Compra eliminada", result });
    }
    catch (error) {
        console.error("Error al eliminar compra:", error);
        res.status(500).json({ message: "Error al eliminar compra" });
    }
});
exports.deleteCompra = deleteCompra;
