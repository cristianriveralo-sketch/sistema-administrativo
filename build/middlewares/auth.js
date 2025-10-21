"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader)
        return res.status(403).json({ message: "Token requerido" });
    const token = authHeader.split(" ")[1];
    if (!token)
        return res.status(403).json({ message: "Token no proporcionado" });
    const payload = (0, jwt_1.verificarToken)(token);
    if (!payload)
        return res.status(401).json({ message: "Token inválido o expirado" });
    req.body.usuario = payload;
    next();
};
exports.authMiddleware = authMiddleware;
