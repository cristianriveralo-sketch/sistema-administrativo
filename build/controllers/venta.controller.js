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
exports.deleteVenta = exports.createVenta = exports.getVentaById = exports.getAllVentas = void 0;
const ventaService = __importStar(require("../services/venta.service"));
// Obtener todas las ventas
const getAllVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ventas = yield ventaService.getAllVentas();
        res.json(ventas);
    }
    catch (error) {
        console.error("Error al obtener ventas:", error);
        res.status(500).json({ message: "Error al obtener ventas" });
    }
});
exports.getAllVentas = getAllVentas;
// Obtener venta por ID
const getVentaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const venta = yield ventaService.getVentaById(Number(id));
        if (!venta)
            return res.status(404).json({ message: "Venta no encontrada" });
        res.json(venta);
    }
    catch (error) {
        console.error("Error al obtener venta:", error);
        res.status(500).json({ message: "Error al obtener venta" });
    }
});
exports.getVentaById = getVentaById;
// Crear nueva venta
const createVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const venta = yield ventaService.createVenta(req.body);
        res.status(201).json(venta);
    }
    catch (error) {
        console.error("Error al crear venta:", error);
        res.status(500).json({ message: "Error al crear venta" });
    }
});
exports.createVenta = createVenta;
// Eliminar venta
const deleteVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield ventaService.deleteVenta(Number(id));
        res.json(result);
    }
    catch (error) {
        console.error("Error al eliminar venta:", error);
        res.status(500).json({ message: "Error al eliminar venta" });
    }
});
exports.deleteVenta = deleteVenta;
