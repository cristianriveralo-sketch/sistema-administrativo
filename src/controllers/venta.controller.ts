import { Request, Response } from "express";

export const getAllVentas = async (req: Request, res: Response) => {
  res.json({ message: "Lista de ventas" });
};

export const getVentaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Venta ${id}` });
};

export const createVenta = async (req: Request, res: Response) => {
  res.json({ message: "Venta creada", data: req.body });
};

export const updateVenta = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Venta ${id} actualizada`, data: req.body });
};

export const deleteVenta = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Venta ${id} eliminada` });
};
