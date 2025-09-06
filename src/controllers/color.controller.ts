import { Request, Response } from "express";
import * as colorService from "../services/color.service";

export const getAllColors = async (req: Request, res: Response) => {
  try {
    const colors = await colorService.getAllColors();
    res.json(colors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener colores" });
  }
};

export const getColorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const color = await colorService.getColorById(Number(id));
    if (!color) return res.status(404).json({ message: "Color no encontrado" });
    res.json(color);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener color" });
  }
};
export const createColor = async (req: Request, res: Response) => {
  try {
    const color = await colorService.createColor(req.body);
    res.status(201).json(color);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear color" });
  }
};

export const updateColor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const color = await colorService.updateColor(Number(id), req.body);
    res.json(color);
  } catch (error: any) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

export const deleteColor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await colorService.deleteColor(Number(id));
    res.json(result);
  } catch (error: any) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};
