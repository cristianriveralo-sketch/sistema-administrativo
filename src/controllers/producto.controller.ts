import { Request, Response } from "express";
import * as productoService from "../services/producto.service";

// todo: Obtener todos los productos
export const getAllProductos = async (req: Request, res: Response) => {
  try {
    const productos = await productoService.getAllProductos();
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

// todo: Obtener producto por ID
export const getProductoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const producto = await productoService.getProductoById(Number(id));
    if (!producto)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener producto" });
  }
};

// todo: Crear nuevo producto
export const createProducto = async (req: Request, res: Response) => {
  try {
    const producto = await productoService.createProducto(req.body);
    res.status(201).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear producto" });
  }
};

// todo: Actualizar producto
export const updateProducto = async (req: Request, res: Response) => {
  try {
  const { id } = req.params;
  const producto = await productoService.updateProducto(Number(id), req.body);
  res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar producto" });
  }
};

// todo: Eliminar producto
export const deleteProducto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await productoService.deleteProducto(Number(id));
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar producto" });
  }
};
