import { Request, Response } from "express";

export const getAllPersonas = async (req: Request, res: Response) => {
  res.json({ message: "Lista de personas" });
};

export const getPersonaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Persona ${id}` });
};

export const createPersona = async (req: Request, res: Response) => {
  res.json({ message: "Persona creada", data: req.body });
};

export const updatePersona = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Persona ${id} actualizada`, data: req.body });
};

export const deletePersona = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Persona ${id} eliminada` });
};
