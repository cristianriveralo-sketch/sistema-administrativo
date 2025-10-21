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
exports.deleteCategoria = exports.updateCategoria = exports.createCategoria = exports.getCategoriaById = exports.getAllCategorias = void 0;
const categoriaService = __importStar(require("../services/categoria.service"));
// todo: Obtener todas las categorías
const getAllCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categorias = yield categoriaService.getAllCategorias();
        res.json(categorias);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener categorías" });
    }
});
exports.getAllCategorias = getAllCategorias;
// todo: Obtener categoría por ID
const getCategoriaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const categoria = yield categoriaService.getCategoriaById(id);
        if (!categoria)
            return res.status(404).json({ message: "Categoría no encontrada" });
        res.json(categoria);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener categoría" });
    }
});
exports.getCategoriaById = getCategoriaById;
// todo: Crear nueva categoría
const createCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoria = yield categoriaService.createCategoria(req.body);
        res.status(201).json(categoria);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear categoría" });
    }
});
exports.createCategoria = createCategoria;
// todo: Actualizar categoría
const updateCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const categoria = yield categoriaService.updateCategoria(id, req.body);
        res.json(categoria);
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message });
    }
});
exports.updateCategoria = updateCategoria;
// todo: Eliminar categoría
const deleteCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield categoriaService.deleteCategoria(id);
        res.json(result);
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message });
    }
});
exports.deleteCategoria = deleteCategoria;
