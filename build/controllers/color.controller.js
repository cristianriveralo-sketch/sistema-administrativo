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
exports.deleteColor = exports.updateColor = exports.createColor = exports.getColorById = exports.getAllColors = void 0;
const colorService = __importStar(require("../services/color.service"));
const getAllColors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const colors = yield colorService.getAllColors();
        res.json(colors);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener colores" });
    }
});
exports.getAllColors = getAllColors;
const getColorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const color = yield colorService.getColorById(Number(id));
        if (!color)
            return res.status(404).json({ message: "Color no encontrado" });
        res.json(color);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener color" });
    }
});
exports.getColorById = getColorById;
const createColor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const color = yield colorService.createColor(req.body);
        res.status(201).json(color);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear color" });
    }
});
exports.createColor = createColor;
const updateColor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const color = yield colorService.updateColor(Number(id), req.body);
        res.json(color);
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message });
    }
});
exports.updateColor = updateColor;
const deleteColor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield colorService.deleteColor(Number(id));
        res.json(result);
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message });
    }
});
exports.deleteColor = deleteColor;
