import { Request, Response } from "express";
import * as productoCompletoService from "../services/producto_x_completo.service";
import { uploadToS3 } from "../utils/s3";
import { Producto } from "../models";


export const getAllProductoCompletos = async (req: Request, res: Response) => {
  try {
    const productosCompletos = await productoCompletoService.getAllProductoCompleto();
    res.json(productosCompletos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener productos completos" });
  }
};
export const getProductoCompletoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const productoCompleto = await productoCompletoService.getProductoCompletoById(Number(id));
    if (!productoCompleto) return res.status(404).json({ message: "ProductoCompleto no encontrado" });
    res.json(productoCompleto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener producto completo" });
  }
};

export const createProductoCompleto = async (req: any, res: Response) => {
  try {
    // Validar existencia del producto ANTES de llamar al service
    const producto = await Producto.findByPk(req.body.id_producto);
    console.log(req.body);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    let fotoUrl: string | null = null;

    if (req.file) {
      const result = await uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype);
      fotoUrl = result.Location;
    }

    const data = {
      ...req.body,
      id_producto: Number(req.body.id_producto),
      id_talla: Number(req.body.id_talla),
      id_color: Number(req.body.id_color),
      precio: Number(req.body.precio),
      cantidad: Number(req.body.cantidad),
      activo: req.body.activo === "true" || req.body.activo === true,
      foto: fotoUrl,
    };

    const productoCompleto = await productoCompletoService.createProductoCompleto(data);
    res.status(201).json(productoCompleto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear producto completo" });
  }
};
export const updateProductoCompleto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const productoCompleto = await productoCompletoService.updateProductoCompleto(Number(id), req.body);
    res.json(productoCompleto);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: (error as Error).message });
  }
};
export const deleteProductoCompleto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const productoCompleto = await productoCompletoService.deleteProductoCompleto(Number(id));
    res.json(productoCompleto);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: (error as Error).message });
  }
};
