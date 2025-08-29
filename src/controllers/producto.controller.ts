import { Request, Response } from "express";

export const getAllProductos = async (req: Request, res: Response) => {
  res.json({ message: "Lista de productos" });
};

export const getProductoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Producto ${id}` });
};

export const createProducto = async (req: Request, res: Response) => {
  res.json({ message: "Producto creado", data: req.body });
};

export const updateProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Producto ${id} actualizado`, data: req.body });
};

export const deleteProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Producto ${id} eliminado` });
};
