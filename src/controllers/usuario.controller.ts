import { Request, Response } from "express";
import { Usuario} from "../models/usuario.model";
import {  Persona } from "../models/persona.model";
import * as usuarioService from "../services/usuario.service";

// Obtener todos los usuarios
export const getAllUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

// Obtener usuario por ID
export const getUsuarioById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const usuario = await usuarioService.getUsuarioById(id);
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

// Crear usuario + persona
export const createUsuario = async (req: Request, res: Response) => {
  try {
    const result = await usuarioService.createUsuario(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error al crear usuario y persona" });
  }
};


// Actualizar usuario
export const updateUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const usuario = await usuarioService.updateUsuario(id, req.body);
    res.json(usuario);
  } catch (error: any) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

// Eliminar usuario
export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await usuarioService.deleteUsuario(id);
    res.json(result);
  } catch (error: any) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};
