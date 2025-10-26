import { Request, Response } from "express";
import * as tallaService from "../services/talla.service";
import { ResponseModel } from "../models/response.model";

// todo: Obtener todas las tallas
export const getAllTallas = async (req: Request, res: Response) => {
  try {
    const tallas = await tallaService.getAlltallas();
    res.status(200).json(
      new ResponseModel("Tallas obtenidas correctamente", false, 200, tallas)
    );
  } catch (error: any) {
    console.error(error);
    res.status(500).json(
      new ResponseModel(error.message || "Error al obtener tallas", true, 500, null)
    );
  }
};

// todo: Obtener talla por ID
export const getTallaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const talla = await tallaService.gettallaById(Number(id));
    if (!talla) {
      return res.status(404).json(
        new ResponseModel("Talla no encontrada", true, 404, null)
      );
    }
    res.status(200).json(
      new ResponseModel("Talla obtenida correctamente", false, 200, talla)
    );
  } catch (error: any) {
    console.error(error);
    res.status(500).json(
      new ResponseModel(error.message || "Error al obtener talla", true, 500, null)
    );
  }
};

// todo: Crear nueva talla
export const createTalla = async (req: Request, res: Response) => {
  try {
    const talla = await tallaService.createtalla(req.body);
    res.status(201).json(
      new ResponseModel("Talla creada correctamente", false, 201, talla)
    );
  } catch (error: any) {
    console.error(error);
    res.status(400).json(
      new ResponseModel(error.message || "Error al crear talla", true, 400, null)
    );
  }
};

// todo: Actualizar talla
export const updateTalla = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const talla = await tallaService.updatetalla(Number(id), req.body);
    res.status(200).json(
      new ResponseModel("Talla actualizada correctamente", false, 200, talla)
    );
  } catch (error: any) {
    console.error(error);
    res.status(400).json(
      new ResponseModel(error.message || "Error al actualizar talla", true, 400, null)
    );
  }
};

// todo: Eliminar talla
export const deleteTalla = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await tallaService.deletetalla(Number(id));
    res.status(200).json(
      new ResponseModel("Talla eliminada correctamente", false, 200, result)
    );
  } catch (error: any) {
    console.error(error);
    res.status(400).json(
      new ResponseModel(error.message || "Error al eliminar talla", true, 400, null)
    );
  }
};
