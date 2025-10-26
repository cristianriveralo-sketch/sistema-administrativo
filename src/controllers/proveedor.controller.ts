import { Request, Response } from "express";
import * as proveedorService from "../services/proveedor.service";
import { ResponseModel } from "../models/response.model";

// todo: Obtener todos los proveedores
export const getAllProveedores = async (req: Request, res: Response) => {
  try {
    const proveedores = await proveedorService.getAllProveedores();
    res.status(200).json(
      new ResponseModel("Proveedores obtenidos correctamente", false, 200, proveedores)
    );
  } catch (error: any) {
    console.error(error);
    res.status(500).json(
      new ResponseModel(error.message || "Error al obtener proveedores", true, 500, null)
    );
  }
};

// todo: Obtener proveedor por ID
export const getProveedorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const proveedor = await proveedorService.getProveedorById(Number(id));
    if (!proveedor) {
      return res
        .status(404)
        .json(new ResponseModel("Proveedor no encontrado", true, 404, null));
    }
    res.status(200).json(
      new ResponseModel("Proveedor obtenido correctamente", false, 200, proveedor)
    );
  } catch (error: any) {
    console.error(error);
    res.status(500).json(
      new ResponseModel(error.message || "Error al obtener proveedor", true, 500, null)
    );
  }
};

// todo: Crear proveedor
export const createProveedor = async (req: Request, res: Response) => {
  try {
    const result = await proveedorService.createProveedor(req.body);
    res.status(201).json(
      new ResponseModel("Proveedor creado correctamente", false, 201, result)
    );
  } catch (error: any) {
    console.error(error);
    res.status(400).json(
      new ResponseModel(error.message || "Error al crear proveedor", true, 400, null)
    );
  }
};

// todo: Actualizar proveedor
export const updateProveedor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const proveedor = await proveedorService.updateProveedor(Number(id), req.body);
    res.status(200).json(
      new ResponseModel("Proveedor actualizado correctamente", false, 200, proveedor)
    );
  } catch (error: any) {
    console.error(error);
    res.status(400).json(
      new ResponseModel(error.message || "Error al actualizar proveedor", true, 400, null)
    );
  }
};

// todo: Eliminar proveedor
export const deleteProveedor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await proveedorService.deleteProveedor(Number(id));
    res.status(200).json(
      new ResponseModel("Proveedor eliminado correctamente", false, 200, result)
    );
  } catch (error: any) {
    console.error(error);
    res.status(400).json(
      new ResponseModel(error.message || "Error al eliminar proveedor", true, 400, null)
    );
  }
};
