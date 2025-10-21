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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostLoginUsuario = void 0;
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const PostLoginUsuario = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        //console.log("username:", username);
        //console.log("Password enviado:", password);
        // buscar solo por username
        const usuario = yield models_1.Usuario.findOne({
            where: { username },
            include: [{ model: (_a = models_1.Usuario.sequelize) === null || _a === void 0 ? void 0 : _a.models.Persona, as: "persona" }],
        });
        if (!usuario) {
            return null;
        }
        // comparar password
        const passwordValido = yield bcrypt_1.default.compare(password, usuario.password);
        if (!passwordValido) {
            return null;
        }
        return usuario;
    }
    catch (error) {
        console.error("Error en loginUsuario:", error);
        throw error;
    }
});
exports.PostLoginUsuario = PostLoginUsuario;
