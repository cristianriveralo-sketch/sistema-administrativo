import { Request, Response } from "express";
import * as productoService from "../services/producto.service";
import { ResponseModel } from "../models/response.model";

// Obtener todos los productos
export const getAllProductos = async (req: Request, res: Response) => {
  try {
    const productos = await productoService.getAllProductos();
    res.status(200).json(
      new ResponseModel("Productos obtenidos correctamente", false, 200, productos)
    );
  } catch (error: any) {
    console.error(error);
    res.status(500).json(
      new ResponseModel(error.message || "Error al obtener productos", true, 500, null)
    );
  }
};

// Obtener producto por ID
export const getProductoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const producto = await productoService.getProductoById(Number(id));
    if (!producto) {
      return res
        .status(404)
        .json(new ResponseModel("Producto no encontrado", true, 404, null));
    }
    res.status(200).json(
      new ResponseModel("Producto obtenido correctamente", false, 200, producto)
    );
  } catch (error: any) {
    console.error(error);
    res.status(500).json(
      new ResponseModel(error.message || "Error al obtener producto", true, 500, null)
    );
  }
};

// Crear nuevo producto
export const createProducto = async (req: Request, res: Response) => {
  try {
    const producto = await productoService.createProducto(req.body);
    res.status(201).json(
      new ResponseModel("Producto creado correctamente", false, 201, producto)
    );
  } catch (error: any) {
    console.error(error);
    res.status(400).json(
      new ResponseModel(error.message || "Error al crear producto", true, 400, null)
    );
  }
};

// Actualizar producto
export const updateProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const producto = await productoService.updateProducto(Number(id), req.body);
    res.status(200).json(
      new ResponseModel("Producto actualizado correctamente", false, 200, producto)
    );
  } catch (error: any) {
    console.error(error);
    res.status(400).json(
      new ResponseModel(error.message || "Error al actualizar producto", true, 400, null)
    );
  }
};

// Eliminar producto
export const deleteProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await productoService.deleteProducto(Number(id));
    res.status(200).json(
      new ResponseModel("Producto eliminado correctamente", false, 200, result)
    );
  } catch (error: any) {
    console.error(error);
    res.status(400).json(
      new ResponseModel(error.message || "Error al eliminar producto", true, 400, null)
    );
  }
};
