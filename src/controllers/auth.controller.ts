import { Request, Response } from "express";
import { PostLoginUsuario } from "../services/auth.service";
import { generarToken } from "../utils/jwt";
import { ResponseModel } from "../models/response.model";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username y password requeridos" });
  }

  try {
    const usuario = await PostLoginUsuario(username, password);
    if (!usuario) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    const token = generarToken({
      id: usuario.id_usuario,
      username: usuario.username,
    });

    res
      .status(200)
      .json(new ResponseModel("Login exitoso", false, 200, { usuario, token }));
  } catch (error) {
    res.status(500).json({ message: "Error en login", error });
  }
};
