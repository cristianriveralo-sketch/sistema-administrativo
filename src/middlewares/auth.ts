import { Request, Response, NextFunction } from "express";
import { verificarToken } from "../utils/jwt";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).json({ message: "Token requerido" });

  const token = authHeader.split(" ")[1]; 
  if (!token) return res.status(403).json({ message: "Token no proporcionado" });

  const payload = verificarToken(token);
  if (!payload) return res.status(401).json({ message: "Token inválido o expirado" });

  req.body.usuario = payload;
  next();
};
