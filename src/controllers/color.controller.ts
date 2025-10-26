import { Request, Response } from "express";
import * as colorService from "../services/color.service";
import { ResponseModel } from "../models/response.model";

// todo: Obtener todos los colores
export const getAllColors = async (req: Request, res: Response) => {
  try {
    const colors = await colorService.getAllColors();
    res.status(200).json(
      new ResponseModel("Colores obtenidos correctamente", false, 200, colors)
    );
  } catch (error: any) {
    console.error(error);
    res.status(500).json(
      new ResponseModel(error.message || "Error al obtener colores", true, 500, null)
    );
  }
};

// todo: Obtener color por ID
export const getColorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const color = await colorService.getColorById(Number(id));
    if (!color) {
      return res.status(404).json(
        new ResponseModel("Color no encontrado", true, 404, null)
      );
    }
    res.status(200).json(
      new ResponseModel("Color obtenido correctamente", false, 200, color)
    );
  } catch (error: any) {
    console.error(error);
    res.status(500).json(
      new ResponseModel(error.message || "Error al obtener color", true, 500, null)
    );
  }
};

// todo: Crear nuevo color
export const createColor = async (req: Request, res: Response) => {
  try {
    const color = await colorService.createColor(req.body);
    res.status(201).json(
      new ResponseModel("Color creado correctamente", false, 201, color)
    );
  } catch (error: any) {
    console.error(error);
    res.status(400).json(
      new ResponseModel(error.message || "Error al crear color", true, 400, null)
    );
  }
};

// todo: Actualizar color
export const updateColor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const color = await colorService.updateColor(Number(id), req.body);
    res.status(200).json(
      new ResponseModel("Color actualizado correctamente", false, 200, color)
    );
  } catch (error: any) {
    console.error(error);
    res.status(400).json(
      new ResponseModel(error.message || "Error al actualizar color", true, 400, null)
    );
  }
};

// todo: Eliminar color
export const deleteColor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await colorService.deleteColor(Number(id));
    res.status(200).json(
      new ResponseModel("Color eliminado correctamente", false, 200, result)
    );
  } catch (error: any) {
    console.error(error);
    res.status(400).json(
      new ResponseModel(error.message || "Error al eliminar color", true, 400, null)
    );
  }
};
