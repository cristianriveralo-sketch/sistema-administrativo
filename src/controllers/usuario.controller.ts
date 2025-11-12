import { Request, Response } from "express";
import * as usuarioService from "../services/usuario.service";
import { ResponseModel } from "../models/response.model";
import { uploadToS3 } from "../utils/s3";
import { CreateUsuarioDTO, UpdateUsuarioDTO } from "../interfaces/usuario.interface";

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

// Crear usuario
export const createUsuario = async (req: any, res: Response) => {
  try {
    let avatarUrl: string | undefined;
    if (req.file) {
      const result = await uploadToS3(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype
      );
      avatarUrl = result.Location;
    }

    const data: CreateUsuarioDTO = {
      usuario: {
        username: req.body.usuario.username,
        password: req.body.usuario.password,
        ...(avatarUrl && { avatar: avatarUrl }),
        activo: req.body.usuario.activo === "true" || req.body.usuario.activo === true,
      },
      persona: {
        nombre: req.body.persona.nombre,
        apellido: req.body.persona.apellido,
        correo: req.body.persona.correo,
        telefono: req.body.persona.telefono ? Number(req.body.persona.telefono) : undefined,
        genero: req.body.persona.genero,
        cedula: req.body.persona.cedula,
        ciudad: req.body.persona.ciudad,
        edad: req.body.persona.edad ? Number(req.body.persona.edad) : undefined,
        id_pais: req.body.persona.id_pais ? Number(req.body.persona.id_pais) : undefined,
      },
    };

    const result = await usuarioService.createUsuario(data);
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

// Actualizar usuario
export const updateUsuario = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    let avatarUrl: string | undefined;
    if (req.file) {
      const result = await uploadToS3(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype
      );
      avatarUrl = result.Location;
    }

    const data: Partial<UpdateUsuarioDTO> = {
      usuario: {
        ...(req.body.usuario && { username: req.body.usuario.username }),
        ...(req.body.usuario && req.body.usuario.password && { password: req.body.usuario.password }),
        ...(avatarUrl && { avatar: avatarUrl }),
        ...(req.body.usuario && req.body.usuario.activo !== undefined && { activo: req.body.usuario.activo === "true" || req.body.usuario.activo === true }),
      },
      persona: {
        ...(req.body.persona && { nombre: req.body.persona.nombre }),
        ...(req.body.persona && { apellido: req.body.persona.apellido }),
        ...(req.body.persona && req.body.persona.email && { email: req.body.persona.email }),
        ...(req.body.persona && req.body.persona.telefono !== undefined && { telefono: Number(req.body.persona.telefono) }),
        ...(req.body.persona && { genero: req.body.persona.genero }),
        ...(req.body.persona && { cedula: req.body.persona.cedula }),
        ...(req.body.persona && { ciudad: req.body.persona.ciudad }),
        ...(req.body.persona && req.body.persona.edad !== undefined && { edad: Number(req.body.persona.edad) }),
        ...(req.body.persona && req.body.persona.id_pais !== undefined && { id_pais: Number(req.body.persona.id_pais) }),
      }
    };

    const result = await usuarioService.updateUsuario(id, data);
    res.status(200).json(
      new ResponseModel("Usuario actualizado correctamente", false, 200, result)
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
