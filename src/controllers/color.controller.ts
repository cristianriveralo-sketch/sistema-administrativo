import { Request, Response } from "express";

export const getAllColors = async (req: Request, res: Response) => {
  res.json({ message: "Lista de colores" });
};

export const getColorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Color ${id}` });
};

export const createColor = async (req: Request, res: Response) => {
  res.json({ message: "Color creado", data: req.body });
};
export const updateColor = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Color ${id} actualizado`, data: req.body });
};
export const deleteColor = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Color ${id} eliminado` });
};
