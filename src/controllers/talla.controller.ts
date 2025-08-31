import { Request, Response } from "express";
import * as tallaService from "../services/talla.service";

export const getAllTallas = async (req: Request, res: Response) => {
  try {
    const talla = await tallaService.getAlltallas();
    res.json(talla);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener tallas" });
  }
};

export const getTallaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const talla = await tallaService.gettallaById(Number(id));
    if (!talla) return res.status(404).json({ message: "Talla no encontrada" });
    res.json(talla);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener talla" });
  }

};

export const createTalla = async (req: Request, res: Response) => {
  try {
    const talla = await tallaService.createtalla(req.body);
    res.status(201).json(talla);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear talla" });
  }
};

export const updateTalla = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const talla = await tallaService.updatetalla(Number(id), req.body);
    res.json(talla);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Talla no encontrada" });    
  }
};

export const deleteTalla = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const talla = await tallaService.deletetalla(Number(id));
    res.json(talla);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Talla no encontrada" });
  }
};
