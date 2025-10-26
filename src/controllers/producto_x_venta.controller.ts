import { Request, Response } from "express";
import * as articuloVenta from "../services/producto_x_venta.service";
import { ResponseModel } from "../models/response.model";

// todo: Obtener todos los artículos de una venta
export const getAllProductoXVentas = async (req: Request, res: Response) => {
  try {
    const { id_venta } = req.query;
    if (!id_venta) {
      return res
        .status(400)
        .json(new ResponseModel("Falta id_venta", true, 400, null));
    }

    const articulos = await articuloVenta.getArticuloByVenta(Number(id_venta));
    res
      .status(200)
      .json(new ResponseModel("Artículos obtenidos correctamente", false, 200, articulos));
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json(new ResponseModel(error.message || "Error al obtener artículos", true, 500, null));
  }
};

// todo: Obtener un artículo de venta por ID
export const getProductoXVentaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const articulo = await articuloVenta.getArticuloVentaById(Number(id));
    if (!articulo)
      return res
        .status(404)
        .json(new ResponseModel("Artículo no encontrado", true, 404, null));

    res
      .status(200)
      .json(new ResponseModel("Artículo obtenido correctamente", false, 200, articulo));
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json(new ResponseModel(error.message || "Error al obtener artículo", true, 500, null));
  }
};

// todo: Crear un artículo de venta
export const createProductoXVenta = async (req: Request, res: Response) => {
  try {
    const nuevoArticulo = await articuloVenta.createArticuloVenta(req.body);
    res
      .status(201)
      .json(new ResponseModel("Artículo de venta creado correctamente", false, 201, nuevoArticulo));
  } catch (error: any) {
    console.error(error);
    res
      .status(400)
      .json(new ResponseModel(error.message || "Error al crear artículo", true, 400, null));
  }
};

// todo: Actualizar un artículo de venta
export const updateProductoXVenta = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const articulo = await articuloVenta.updateArticuloVenta(Number(id), req.body);
    if (!articulo)
      return res
        .status(404)
        .json(new ResponseModel("Artículo no encontrado", true, 404, null));

    res
      .status(200)
      .json(new ResponseModel(`Artículo ${id} actualizado correctamente`, false, 200, articulo));
  } catch (error: any) {
    console.error(error);
    res
      .status(400)
      .json(new ResponseModel(error.message || "Error al actualizar artículo", true, 400, null));
  }
};

// todo: Eliminar un artículo de venta
export const deleteProductoXVenta = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await articuloVenta.deleteArticuloVenta(Number(id));
    res
      .status(200)
      .json(new ResponseModel("Artículo eliminado correctamente", false, 200, result));
  } catch (error: any) {
    console.error(error);
    res
      .status(400)
      .json(new ResponseModel(error.message || "Error al eliminar artículo", true, 400, null));
  }
};