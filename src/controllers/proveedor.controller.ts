import { Request, Response } from "express";

export const getAllProveedores = async (req: Request, res: Response) => {
  res.json({ message: "Lista de proveedores" });
};

export const getProveedorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Proveedor ${id}` });
};

export const createProveedor = async (req: Request, res: Response) => {
  res.json({ message: "Proveedor creado", data: req.body });
};

export const updateProveedor = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Proveedor ${id} actualizado`, data: req.body });
};

export const deleteProveedor = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Proveedor ${id} eliminado` });
};
