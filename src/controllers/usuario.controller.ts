import { Request, Response } from "express";

export const getAllUsuarios = async (req: Request, res: Response) => {
  res.json({ message: "Lista de usuarios" });
};

export const getUsuarioById = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Usuario ${id}` });
};

export const createUsuario = async (req: Request, res: Response) => {
  res.json({ message: "Usuario creado", data: req.body });
};

export const updateUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Usuario ${id} actualizado`, data: req.body });
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Usuario ${id} eliminado` });
};
