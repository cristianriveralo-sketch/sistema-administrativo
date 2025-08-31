import { Request, Response } from "express";
import * as clienteService from "../services/cliente.service";

export const getAllClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await clienteService.getAllClientes();
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener clientes" });
  }
};

export const getClienteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cliente = await clienteService.getClienteById(id);
    if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });
    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener cliente" });
  }
};

export const createCliente = async (req: Request, res: Response) => {
  try {
    const cliente = await clienteService.createCliente(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear cliente y persona" });
  }
};

export const updateCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cliente = await clienteService.updateCliente(id, req.body);
    res.status(200).json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cliente no encontrado" });
  }
};

export const deleteCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cliente = await clienteService.deleteCliente(id);
    if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });
    res.status(200).json({ message: "Cliente eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar cliente" });
  }
};
