import { Request, Response } from "express";
import * as paisService from "../services/pais.service";

// todo: Obtener todos los países
export const getAllPaiss = async (req: Request, res: Response) => {
  try {
    const paises = await paisService.getAllPaiss();
    res.json(paises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener países" });
  }
};

//todo: Obtener país por ID
export const getPaisById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pais = await paisService.getPaisById(id);
    if (!pais) return res.status(404).json({ message: "País no encontrado" });
    res.json(pais);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener país" });
  }
};

//todo: Crear nuevo país
export const createPais = async (req: Request, res: Response) => {
  try {
    const pais = await paisService.createPais(req.body);
    res.status(201).json(pais);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear país" });
  }
};

//todo: Actualizar país
export const updatePais = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pais = await paisService.updatePais(id, req.body);
    res.json(pais);
  } catch (error: any) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

//todo: Eliminar país
export const deletePais = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await paisService.deletePais(id);
    res.json(result);
  } catch (error: any) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};
