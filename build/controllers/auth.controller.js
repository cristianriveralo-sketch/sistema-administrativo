"use strict";
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
exports.login = void 0;
const auth_service_1 = require("../services/auth.service");
const jwt_1 = require("../utils/jwt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username y password requeridos" });
    }
    try {
        const usuario = yield (0, auth_service_1.PostLoginUsuario)(username, password);
        if (!usuario) {
            return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
        }
        const token = (0, jwt_1.generarToken)(usuario);
        res.json({ message: "Login exitoso", usuario, token });
    }
    catch (error) {
        res.status(500).json({ message: "Error en login", error });
    }
});
exports.login = login;
