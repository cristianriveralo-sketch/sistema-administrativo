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
exports.deleteUsuario = exports.updateUsuario = exports.createUsuario = exports.getUsuarioById = exports.getAllUsuarios = void 0;
const usuario_model_1 = require("../models/usuario.model");
const persona_model_1 = require("../models/persona.model");
const usuarioService = __importStar(require("../services/usuario.service"));
// Obtener todos los usuarios
const getAllUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield usuarioService.getAllUsuarios();
        res.json(usuarios);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
});
exports.getAllUsuarios = getAllUsuarios;
// Obtener usuario por ID
const getUsuarioById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuarioService.getUsuarioById(id);
        if (!usuario)
            return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(usuario);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener usuario" });
    }
});
exports.getUsuarioById = getUsuarioById;
// Crear usuario + persona
const createUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuario, persona } = req.body;
        if (!usuario || !persona) {
            return res.status(400).json({ message: "Datos incompletos: faltan usuario o persona" });
        }
        const usernameExists = yield usuario_model_1.Usuario.findOne({ where: { username: usuario.username } });
        if (usernameExists) {
            return res.status(400).json({ message: "El nombre de usuario ya está registrado" });
        }
        const emailExists = yield persona_model_1.Persona.findOne({ where: { email: persona.correo } });
        if (emailExists) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }
        const phoneExists = yield persona_model_1.Persona.findOne({ where: { telefono: persona.telefono } });
        if (phoneExists) {
            return res.status(400).json({ message: "El teléfono ya está registrado" });
        }
        if (persona.cedula) {
            const cedulaExists = yield persona_model_1.Persona.findOne({ where: { cedula: persona.cedula } });
            if (cedulaExists) {
                return res.status(400).json({ message: "La cédula ya está registrada" });
            }
        }
        const result = yield usuarioService.createUsuario(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ message: "Error al crear usuario y persona" });
    }
});
exports.createUsuario = createUsuario;
// Actualizar usuario
const updateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuarioService.updateUsuario(id, req.body);
        res.json(usuario);
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message });
    }
});
exports.updateUsuario = updateUsuario;
// Eliminar usuario
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield usuarioService.deleteUsuario(id);
        res.json(result);
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message });
    }
});
exports.deleteUsuario = deleteUsuario;
