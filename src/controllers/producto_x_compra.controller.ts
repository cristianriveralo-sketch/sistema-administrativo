import { Request, Response } from "express";
import * as articuloService from "../services/producto_x_compra.service";
import { ResponseModel } from "../models/response.model";

// todo: Obtener todos los artículos de una compra (por id_compra_inventario)
export const getAllProductoXCompras = async (req: Request, res: Response) => {
  try {
    const { id_compra_inventario } = req.query;
    if (!id_compra_inventario) {
      return res
        .status(400)
        .json(new ResponseModel("Falta id_compra_inventario", true, 400, null));
    }

    const articulos = await articuloService.getArticulosByCompra(Number(id_compra_inventario));
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

// todo: Obtener todos los id_axc por id_compra_inventario
export const getIdsAxCByCompra = async (req: Request, res: Response) => {
  try {
    const { id_compra_inventario } = req.params;
    const ids = await articuloService.getIdsAxCByCompra(Number(id_compra_inventario));
    res
      .status(200)
      .json(new ResponseModel("IDs obtenidos correctamente", false, 200, ids));
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json(new ResponseModel(error.message || "Error al obtener IDs", true, 500, null));
  }
};

// todo: Obtener un artículo por ID
export const getProductoXCompraById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const articulo = await articuloService.getArticuloCompraById(Number(id));

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

// todo: Crear un nuevo artículo en la compra
export const createProductoXCompra = async (req: Request, res: Response) => {
  try {
    const nuevoArticulo = await articuloService.createArticuloCompra(req.body);
    res
      .status(201)
      .json(new ResponseModel("Artículo creado correctamente", false, 201, nuevoArticulo));
  } catch (error: any) {
    console.error(error);
    res
      .status(400)
      .json(new ResponseModel(error.message || "Error al crear artículo", true, 400, null));
  }
};

// todo: Actualizar un artículo de la compra
export const updateProductoXCompra = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const articuloActualizado = await articuloService.updateArticuloCompra(Number(id), req.body);

    if (!articuloActualizado)
      return res
        .status(404)
        .json(new ResponseModel("Artículo no encontrado para actualizar", true, 404, null));

    res
      .status(200)
      .json(new ResponseModel("Artículo actualizado correctamente", false, 200, articuloActualizado));
  } catch (error: any) {
    console.error(error);
    res
      .status(400)
      .json(new ResponseModel(error.message || "Error al actualizar artículo", true, 400, null));
  }
};

// todo: Eliminar un artículo de la compra
export const deleteProductoXCompra = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await articuloService.deleteArticuloCompra(Number(id));
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