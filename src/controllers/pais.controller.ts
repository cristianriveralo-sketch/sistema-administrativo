import { Request, Response } from "express";

export const getAllPais = async (req: Request, res: Response) => {
  res.json({ message: "Lista de países" });
};

export const getPaisById = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `País ${id}` });
};

export const createPais = async (req: Request, res: Response) => {
  res.json({ message: "País creado", data: req.body });
};

export const updatePais = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `País ${id} actualizado`, data: req.body });
};

export const deletePais = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `País ${id} eliminado` });
};
