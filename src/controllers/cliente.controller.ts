import { Request, Response } from "express";
import * as clienteService from "../services/cliente.service";
import { ResponseModel } from "../models/response.model";

// todo: Obtener todos los clientes
export const getAllClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await clienteService.getAllClientes();
    res
      .status(200)
      .json(new ResponseModel("Clientes obtenidos correctamente", false, 200, clientes));
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json(new ResponseModel(error.message || "Error al obtener clientes", true, 500, null));
  }
};

// todo: Obtener cliente por ID
export const getClienteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cliente = await clienteService.getClienteById(id);
    if (!cliente)
      return res
        .status(404)
        .json(new ResponseModel("Cliente no encontrado", true, 404, null));

    res
      .status(200)
      .json(new ResponseModel("Cliente obtenido correctamente", false, 200, cliente));
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json(new ResponseModel(error.message || "Error al obtener cliente", true, 500, null));
  }
};

// todo: Crear cliente
export const createCliente = async (req: Request, res: Response) => {
  try {
    const cliente = await clienteService.createCliente(req.body);
    res
      .status(201)
      .json(new ResponseModel("Cliente creado correctamente", false, 201, cliente));
  } catch (error: any) {
    console.error(error);
    res
      .status(400)
      .json(new ResponseModel(error.message || "Error al crear cliente", true, 400, null));
  }
};

// todo: Actualizar cliente
export const updateCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cliente = await clienteService.updateCliente(id, req.body);
    res
      .status(200)
      .json(new ResponseModel("Cliente actualizado correctamente", false, 200, cliente));
  } catch (error: any) {
    console.error(error);
    res
      .status(400)
      .json(new ResponseModel(error.message || "Error al actualizar cliente", true, 400, null));
  }
};

// todo: Eliminar cliente
export const deleteCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await clienteService.deleteCliente(id);
    res
      .status(200)
      .json(new ResponseModel("Cliente eliminado correctamente", false, 200, result));
  } catch (error: any) {
    console.error(error);
    res
      .status(400)
      .json(new ResponseModel(error.message || "Error al eliminar cliente", true, 400, null));
  }
};
