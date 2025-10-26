import { Request, Response } from "express";
import * as productoCompletoService from "../services/producto_x_completo.service";
import { uploadToS3 } from "../utils/s3";
import { Producto } from "../models";
import { ResponseModel } from "../models/response.model";

// todo: Obtener todos los productos completos
export const getAllProductoCompletos = async (req: Request, res: Response) => {
  try {
    const productosCompletos = await productoCompletoService.getAllProductoCompleto();
    res
      .status(200)
      .json(new ResponseModel("Productos completos obtenidos correctamente", false, 200, productosCompletos));
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json(new ResponseModel(error.message || "Error al obtener productos completos", true, 500, null));
  }
};

// todo: Obtener producto completo por ID
export const getProductoCompletoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const productoCompleto = await productoCompletoService.getProductoCompletoById(Number(id));
    if (!productoCompleto)
      return res
        .status(404)
        .json(new ResponseModel("Producto completo no encontrado", true, 404, null));

    res
      .status(200)
      .json(new ResponseModel("Producto completo obtenido correctamente", false, 200, productoCompleto));
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json(new ResponseModel(error.message || "Error al obtener producto completo", true, 500, null));
  }
};

// todo: Crear producto completo
export const createProductoCompleto = async (req: any, res: Response) => {
  try {
    // Validar existencia del producto antes de crear
    const producto = await Producto.findByPk(req.body.id_producto);
    if (!producto) {
      return res
        .status(404)
        .json(new ResponseModel("Producto no encontrado", true, 404, null));
    }

    let fotoUrl: string | null = null;

    // Subir foto a S3 si existe
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
    res
      .status(201)
      .json(new ResponseModel("Producto completo creado correctamente", false, 201, productoCompleto));
  } catch (error: any) {
    console.error(error);
    res
      .status(400)
      .json(new ResponseModel(error.message || "Error al crear producto completo", true, 400, null));
  }
};

// todo: Actualizar producto completo
export const updateProductoCompleto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const productoCompleto = await productoCompletoService.updateProductoCompleto(Number(id), req.body);
    res
      .status(200)
      .json(new ResponseModel("Producto completo actualizado correctamente", false, 200, productoCompleto));
  } catch (error: any) {
    console.error(error);
    res
      .status(400)
      .json(new ResponseModel(error.message || "Error al actualizar producto completo", true, 400, null));
  }
};

// todo: Eliminar producto completo
export const deleteProductoCompleto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await productoCompletoService.deleteProductoCompleto(Number(id));
    res
      .status(200)
      .json(new ResponseModel("Producto completo eliminado correctamente", false, 200, result));
  } catch (error: any) {
    console.error(error);
    res
      .status(400)
      .json(new ResponseModel(error.message || "Error al eliminar producto completo", true, 400, null));
  }
};
