import { Request, Response } from "express";
import * as proveedorService from "../services/proveedor.service";

export const getAllProveedores = async (req: Request, res: Response) => {
  try {
    const proveedores = await proveedorService.getAllProveedores();
    res.json(proveedores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener proveedores" });
  }
};

export const getProveedorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const proveedor = await proveedorService.getProveedorById(Number(id));
    if (!proveedor) return res.status(404).json({ message: "Proveedor no encontrado" });
    res.json(proveedor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener proveedor" });
  }
};

export const createProveedor = async (req: Request, res: Response) => {
  try {
    const result = await proveedorService.createProveedor(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear proveedor y persona" });
  }
};

export const updateProveedor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const proveedor = await proveedorService.updateProveedor(Number(id), req.body);
    res.status(200).json(proveedor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Proveedor no encontrado" });
  }
};

export const deleteProveedor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const proveedor = await proveedorService.deleteProveedor(Number(id));
    if (!proveedor) return res.status(404).json({ message: "Proveedor no encontrado" });
    res.status(200).json({ message: "Proveedor eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar proveedor" });
  }
};
