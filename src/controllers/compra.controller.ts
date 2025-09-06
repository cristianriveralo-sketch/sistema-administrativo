import { Request, Response } from "express";

export const getAllCompras = async (req: Request, res: Response) => {
  res.json({ message: "Lista de compras" });
};

export const getCompraById = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Compra ${id}` });
};

export const createCompra = async (req: Request, res: Response) => {
  res.json({ message: "Compra creada", data: req.body });
};

export const updateCompra = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Compra ${id} actualizada`, data: req.body });
};

export const deleteCompra = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Compra ${id} eliminada` });
};
