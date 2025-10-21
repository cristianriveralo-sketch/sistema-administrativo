import { Request, Response } from "express";
import * as categoriaService from "../services/categoria.service";
import { ResponseModel } from "../models/response.model";

// Obtener todas las categorías
export const getAllCategorias = async (req: Request, res: Response) => {
  try {
    const categorias = await categoriaService.getAllCategorias();
    res.status(200).json(
      new ResponseModel("Categorías obtenidas correctamente", false, 200, categorias)
    );
  } catch (error: any) {
    console.error(error);
    res.status(500).json(
      new ResponseModel(error.message || "Error al obtener categorías", true, 500, null)
    );
  }
};

// Obtener categoría por ID
export const getCategoriaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const categoria = await categoriaService.getCategoriaById(id);
    if (!categoria) {
      return res.status(404).json(
        new ResponseModel("Categoría no encontrada", true, 404, null)
      );
    }
    res.status(200).json(
      new ResponseModel("Categoría obtenida correctamente", false, 200, categoria)
    );
  } catch (error: any) {
    console.error(error);
    res.status(500).json(
      new ResponseModel(error.message || "Error al obtener categoría", true, 500, null)
    );
  }
};

// Crear nueva categoría
export const createCategoria = async (req: Request, res: Response) => {
  try {
    const categoria = await categoriaService.createCategoria(req.body);
    res.status(201).json(
      new ResponseModel("Categoría creada correctamente", false, 201, categoria)
    );
  } catch (error: any) {
    console.error(error);
    res.status(400).json(
      new ResponseModel(error.message || "Error al crear categoría", true, 400, null)
    );
  }
};

// Actualizar categoría
export const updateCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const categoria = await categoriaService.updateCategoria(id, req.body);
    res.status(200).json(
      new ResponseModel("Categoría actualizada correctamente", false, 200, categoria)
    );
  } catch (error: any) {
    console.error(error);
    res.status(400).json(
      new ResponseModel(error.message, true, 400, null)
    );
  }
};

// Eliminar categoría
export const deleteCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await categoriaService.deleteCategoria(id);
    res.status(200).json(
      new ResponseModel("Categoría eliminada correctamente", false, 200, result)
    );
  } catch (error: any) {
    console.error(error);
    res.status(400).json(
      new ResponseModel(error.message, true, 400, null)
    );
  }
};
