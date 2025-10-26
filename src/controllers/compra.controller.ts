import { Request, Response } from "express";
import * as compraService from "../services/compra.service";
import { ResponseModel } from "../models/response.model";

// todo: Obtener todas las compras
export const getAllCompras = async (req: Request, res: Response) => {
  try {
    const compras = await compraService.getAllCompras();
    res
      .status(200)
      .json(new ResponseModel("Compras obtenidas correctamente", false, 200, compras));
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json(new ResponseModel(error.message || "Error al obtener compras", true, 500, null));
  }
};

// todo: Obtener compra por ID
export const getCompraById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const compra = await compraService.getCompraById(Number(id));
    if (!compra)
      return res
        .status(404)
        .json(new ResponseModel("Compra no encontrada", true, 404, null));

    res
      .status(200)
      .json(new ResponseModel("Compra obtenida correctamente", false, 200, compra));
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json(new ResponseModel(error.message || "Error al obtener compra", true, 500, null));
  }
};

// todo: Crear nueva compra
export const createCompra = async (req: Request, res: Response) => {
  try {
    const compra = await compraService.createCompra(req.body);
    res
      .status(201)
      .json(new ResponseModel("Compra creada correctamente", false, 201, compra));
  } catch (error: any) {
    console.error(error);
    res
      .status(400)
      .json(new ResponseModel(error.message || "Error al crear compra", true, 400, null));
  }
};


// todo: Eliminar compra
export const deleteCompra = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await compraService.deleteCompra(Number(id));
    res
      .status(200)
      .json(new ResponseModel("Compra eliminada correctamente", false, 200, result));
  } catch (error: any) {
    console.error(error);
    res
      .status(400)
      .json(new ResponseModel(error.message || "Error al eliminar compra", true, 400, null));
  }
};
