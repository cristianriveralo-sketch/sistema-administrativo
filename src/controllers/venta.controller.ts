import { Request, Response } from "express";
import * as ventaService from "../services/venta.service";
import { ResponseModel } from "../models/response.model";

// todo: Obtener todas las ventas
export const getAllVentas = async (req: Request, res: Response) => {
  try {
    const ventas = await ventaService.getAllVentas();
    res
      .status(200)
      .json(new ResponseModel("Ventas obtenidas correctamente", false, 200, ventas));
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json(new ResponseModel(error.message || "Error al obtener ventas", true, 500, null));
  }
};

// todo: Obtener venta por ID
export const getVentaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const venta = await ventaService.getVentaById(Number(id));
    if (!venta)
      return res
        .status(404)
        .json(new ResponseModel("Venta no encontrada", true, 404, null));

    res
      .status(200)
      .json(new ResponseModel("Venta obtenida correctamente", false, 200, venta));
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json(new ResponseModel(error.message || "Error al obtener venta", true, 500, null));
  }
};

// todo: Crear nueva venta
export const createVenta = async (req: Request, res: Response) => {
  try {
    const venta = await ventaService.createVenta(req.body);
    res
      .status(201)
      .json(new ResponseModel("Venta creada correctamente", false, 201, venta));
  } catch (error: any) {
    console.error(error);
    res
      .status(400)
      .json(new ResponseModel(error.message || "Error al crear venta", true, 400, null));
  }
};

// todo: Eliminar venta
export const deleteVenta = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await ventaService.deleteVenta(Number(id));
    res
      .status(200)
      .json(new ResponseModel("Venta eliminada correctamente", false, 200, result));
  } catch (error: any) {
    console.error(error);
    res
      .status(400)
      .json(new ResponseModel(error.message || "Error al eliminar venta", true, 400, null));
  }
};
