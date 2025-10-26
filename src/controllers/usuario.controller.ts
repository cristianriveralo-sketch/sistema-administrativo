import { Request, Response } from "express";
import * as usuarioService from "../services/usuario.service";
import { ResponseModel } from "../models/response.model";

// todo: Obtener todos los usuarios
export const getAllUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    res.status(200).json(
      new ResponseModel("Usuarios obtenidos correctamente", false, 200, usuarios)
    );
  } catch (error: any) {
    console.error(error);
    res.status(500).json(
      new ResponseModel(error.message || "Error al obtener usuarios", true, 500, null)
    );
  }
};

// todo: Obtener usuario por ID
export const getUsuarioById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const usuario = await usuarioService.getUsuarioById(id);
    if (!usuario)
      return res
        .status(404)
        .json(new ResponseModel("Usuario no encontrado", true, 404, null));

    res.status(200).json(
      new ResponseModel("Usuario obtenido correctamente", false, 200, usuario)
    );
  } catch (error: any) {
    console.error(error);
    res.status(500).json(
      new ResponseModel(error.message || "Error al obtener usuario", true, 500, null)
    );
  }
};

// todo: Crear usuario
export const createUsuario = async (req: Request, res: Response) => {
  try {
    const result = await usuarioService.createUsuario(req.body);
    res.status(201).json(
      new ResponseModel("Usuario creado correctamente", false, 201, result)
    );
  } catch (error: any) {
    console.error(error);
    res.status(400).json(
      new ResponseModel(error.message || "Error al crear usuario", true, 400, null)
    );
  }
};

// todo: Actualizar usuario
export const updateUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const usuario = await usuarioService.updateUsuario(id, req.body);
    res.status(200).json(
      new ResponseModel("Usuario actualizado correctamente", false, 200, usuario)
    );
  } catch (error: any) {
    console.error(error);
    res.status(400).json(
      new ResponseModel(error.message || "Error al actualizar usuario", true, 400, null)
    );
  }
};

// todo: Eliminar usuario
export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await usuarioService.deleteUsuario(id);
    res.status(200).json(
      new ResponseModel("Usuario eliminado correctamente", false, 200, result)
    );
  } catch (error: any) {
    console.error(error);
    res.status(400).json(
      new ResponseModel(error.message || "Error al eliminar usuario", true, 400, null)
    );
  }
};
