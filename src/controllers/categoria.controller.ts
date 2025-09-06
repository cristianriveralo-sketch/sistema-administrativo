import { Request, Response } from "express";
import * as categoriaService from "../services/categoria.service";

// todo: Obtener todas las categorías
export const getAllCategorias = async (req: Request, res: Response) => {
  try {
    const categorias = await categoriaService.getAllCategorias();
    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener categorías" });
  }
};

// todo: Obtener categoría por ID
export const getCategoriaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const categoria = await categoriaService.getCategoriaById(id);
    if (!categoria) return res.status(404).json({ message: "Categoría no encontrada" });
    res.json(categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener categoría" });
  }
};

// todo: Crear nueva categoría
export const createCategoria = async (req: Request, res: Response) => {
  try {
    const categoria = await categoriaService.createCategoria(req.body);
    res.status(201).json(categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear categoría" });
  }
};

// todo: Actualizar categoría
export const updateCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const categoria = await categoriaService.updateCategoria(id, req.body);
    res.json(categoria);
  } catch (error: any) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

// todo: Eliminar categoría
export const deleteCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await categoriaService.deleteCategoria(id);
    res.json(result);
  } catch (error: any) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};
