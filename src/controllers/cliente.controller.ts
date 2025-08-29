import { Request, Response } from "express";

export const getAllClientes = async (req: Request, res: Response) => {
  res.json({ message: "Lista de clientes" });
};

export const getClienteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Cliente ${id}` });
};

export const createCliente = async (req: Request, res: Response) => {
  res.json({ message: "Cliente creado", data: req.body });
};

export const updateCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Cliente ${id} actualizado`, data: req.body });
};

export const deleteCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Cliente ${id} eliminado` });
};
