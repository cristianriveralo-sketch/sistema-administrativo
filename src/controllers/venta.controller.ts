import { Request, Response } from "express";
import * as ventaService from "../services/venta.service";

// Obtener todas las ventas
export const getAllVentas = async (req: Request, res: Response) => {
  try {
    const ventas = await ventaService.getAllVentas();
    res.json(ventas);
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    res.status(500).json({ message: "Error al obtener ventas" });
  }
};

// Obtener venta por ID
export const getVentaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const venta = await ventaService.getVentaById(Number(id));
    if (!venta) return res.status(404).json({ message: "Venta no encontrada" });
    res.json(venta);
  } catch (error) {
    console.error("Error al obtener venta:", error);
    res.status(500).json({ message: "Error al obtener venta" });
  }
};

// Crear nueva venta
export const createVenta = async (req: Request, res: Response) => {
  try {
    const venta = await ventaService.createVenta(req.body);
    res.status(201).json(venta);
  } catch (error) {
    console.error("Error al crear venta:", error);
    res.status(500).json({ message: "Error al crear venta" });
  }
};

// Eliminar venta
export const deleteVenta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await ventaService.deleteVenta(Number(id));
    res.json(result);
  } catch (error) {
    console.error("Error al eliminar venta:", error);
    res.status(500).json({ message: "Error al eliminar venta" });
  }
};
