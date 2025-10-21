"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = exports.generarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY || "clave_por_defecto";
const generarToken = (usuario) => {
    return jsonwebtoken_1.default.sign({
        id_usuario: usuario.id_usuario,
        username: usuario.username,
        id_persona: usuario.id_persona
    }, SECRET_KEY, { expiresIn: "1h" });
};
exports.generarToken = generarToken;
const verificarToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, SECRET_KEY);
    }
    catch (error) {
        return null;
    }
};
exports.verificarToken = verificarToken;
