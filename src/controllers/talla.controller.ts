import { Request, Response } from "express";

export const getAllTallas = async (req: Request, res: Response) => {
  res.json({ message: "Lista de tallas" });
};

export const getTallaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Talla ${id}` });
};

export const createTalla = async (req: Request, res: Response) => {
  res.json({ message: "Talla creada", data: req.body });
};

export const updateTalla = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Talla ${id} actualizada`, data: req.body });
};

export const deleteTalla = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Talla ${id} eliminada` });
};
