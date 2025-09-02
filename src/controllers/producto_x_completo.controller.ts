import { Request, Response } from "express";
import * as productoCompletoService from "../services/producto_x_completo.service";

export const getAllProductoCompletos = async (req: Request, res: Response) => {
  try {
    const productosCompletos = await productoCompletoService.getAllProductoCompleto();
    res.json(productosCompletos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener productos completos" });
  }
};
export const getProductoCompletoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const productoCompleto = await productoCompletoService.getProductoCompletoById(Number(id));
    if (!productoCompleto) return res.status(404).json({ message: "ProductoCompleto no encontrado" });
    res.json(productoCompleto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener producto completo" });
  }
};

export const createProductoCompleto = async (req: Request, res: Response) => {
  try {
    const productoCompleto = await productoCompletoService.createProductoCompleto(req.body);
    res.status(201).json(productoCompleto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear producto completo" });
  }
};
export const updateProductoCompleto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const productoCompleto = await productoCompletoService.updateProductoCompleto(Number(id), req.body);
    res.json(productoCompleto);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: (error as Error).message });
  }
};
export const deleteProductoCompleto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const productoCompleto = await productoCompletoService.deleteProductoCompleto(Number(id));
    res.json(productoCompleto);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: (error as Error).message });
  }
};
