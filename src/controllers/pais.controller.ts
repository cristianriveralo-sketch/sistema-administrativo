import { Request, Response } from "express";
import * as paisService from "../services/pais.service";
import { ResponseModel } from "../models/response.model";

// todo: Obtener todos los países
export const getAllPaiss = async (req: Request, res: Response) => {
  try {
    const paises = await paisService.getAllPaiss();
    res.status(200).json(
      new ResponseModel("Países obtenidos correctamente", false, 200, paises)
    );
  } catch (error: any) {
    console.error(error);
    res.status(500).json(
      new ResponseModel(error.message || "Error al obtener países", true, 500, null)
    );
  }
};

// todo: Obtener país por ID
export const getPaisById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pais = await paisService.getPaisById(id);
    if (!pais) {
      return res.status(404).json(
        new ResponseModel("País no encontrado", true, 404, null)
      );
    }
    res.status(200).json(
      new ResponseModel("País obtenido correctamente", false, 200, pais)
    );
  } catch (error: any) {
    console.error(error);
    res.status(500).json(
      new ResponseModel(error.message || "Error al obtener país", true, 500, null)
    );
  }
};

// todo: Crear nuevo país
export const createPais = async (req: Request, res: Response) => {
  try {
    const pais = await paisService.createPais(req.body);
    res.status(201).json(
      new ResponseModel("País creado correctamente", false, 201, pais)
    );
  } catch (error: any) {
    console.error(error);
    res.status(400).json(
      new ResponseModel(error.message || "Error al crear país", true, 400, null)
    );
  }
};

// todo: Actualizar país
export const updatePais = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pais = await paisService.updatePais(id, req.body);
    res.status(200).json(
      new ResponseModel("País actualizado correctamente", false, 200, pais)
    );
  } catch (error: any) {
    console.error(error);
    res.status(400).json(
      new ResponseModel(error.message || "Error al actualizar país", true, 400, null)
    );
  }
};

// todo: Eliminar país
export const deletePais = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await paisService.deletePais(Number(id));
    res.status(200).json(
      new ResponseModel("País eliminado correctamente", false, 200, result)
    );
  } catch (error: any) {
    console.error(error);
    res.status(400).json(
      new ResponseModel(error.message || "Error al eliminar país", true, 400, null)
    );
  }
};
