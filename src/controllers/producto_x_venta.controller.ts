import { Request, Response } from "express";

export const getAllProductoXVentas = async (req: Request, res: Response) => {
  res.json({ message: "Lista de productos por venta" });
};

export const getProductoXVentaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `ProductoXVenta ${id}` });
};

export const createProductoXVenta = async (req: Request, res: Response) => {
  res.json({ message: "ProductoXVenta creado", data: req.body });
};

export const updateProductoXVenta = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `ProductoXVenta ${id} actualizado`, data: req.body });
};

export const deleteProductoXVenta = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `ProductoXVenta ${id} eliminado` });
};
