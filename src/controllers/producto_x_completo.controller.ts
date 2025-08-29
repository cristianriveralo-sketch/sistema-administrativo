import { Request, Response } from "express";

export const getAllProductoCompletos = async (req: Request, res: Response) => {
  res.json({ message: "Lista de productos completos" });
};
export const getProductoCompletoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `ProductoCompleto ${id}` });
};

export const createProductoCompleto = async (req: Request, res: Response) => {
  res.json({ message: "ProductoCompleto creado", data: req.body });
};
export const updateProductoCompleto = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `ProductoCompleto ${id} actualizado`, data: req.body });
};
export const deleteProductoCompleto = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `ProductoCompleto ${id} eliminado` });
};
