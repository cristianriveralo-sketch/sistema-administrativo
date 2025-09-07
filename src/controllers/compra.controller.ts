import { Request, Response } from "express";
import * as compraService from "../services/compra.service";

// Obtener todas las compras
export const getAllCompras = async (req: Request, res: Response) => {
  try {
    const compras = await compraService.getAllCompras();
    res.json(compras);
  } catch (error) {
    console.error("Error al obtener compras:", error);
    res.status(500).json({ message: "Error al obtener compras" });
  }
};

// Obtener compra por ID
export const getCompraById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const compra = await compraService.getCompraById(Number(id));
    if (!compra) return res.status(404).json({ message: "Compra no encontrada" });
    res.json(compra);
  } catch (error) {
    console.error("Error al obtener compra:", error);
    res.status(500).json({ message: "Error al obtener compra" });
  }
};

// Crear nueva compra
export const createCompra = async (req: Request, res: Response) => {
  try {
    const compra = await compraService.createCompra(req.body);
    res.status(201).json(compra);
  } catch (error) {
    console.error("Error al crear compra:", error);
    res.status(500).json({ message: "Error al crear compra" });
  }
};

// Eliminar compra
export const deleteCompra = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await compraService.deleteCompra(Number(id));
    res.json({ message: "Compra eliminada", result });
  } catch (error) {
    console.error("Error al eliminar compra:", error);
    res.status(500).json({ message: "Error al eliminar compra" });
  }
};
