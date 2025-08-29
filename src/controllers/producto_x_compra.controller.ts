import { Request, Response } from "express";

export const getAllProductoXCompras = async (req: Request, res: Response) => {
  res.json({ message: "Lista de productos por compra" });
};

export const getProductoXCompraById = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `ProductoXCompra ${id}` });
};

export const createProductoXCompra = async (req: Request, res: Response) => {
  res.json({ message: "ProductoXCompra creado", data: req.body });
};

export const updateProductoXCompra = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `ProductoXCompra ${id} actualizado`, data: req.body });
};

export const deleteProductoXCompra = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `ProductoXCompra ${id} eliminado` });
};
