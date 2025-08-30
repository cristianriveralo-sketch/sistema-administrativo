import { Request, Response } from "express";
import { PostLoginUsuario } from "../services/auth.service";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username y password requeridos" });
  }

  try {
    const usuario = await PostLoginUsuario(username, password);
    if (!usuario) {
      return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }

    res.json({ message: "Login exitoso", usuario });
  } catch (error) {
    res.status(500).json({ message: "Error en login", error });
  }
};
