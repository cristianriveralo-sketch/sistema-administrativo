import { Request, Response } from "express";
import * as articuloService from "../services/producto_x_compra.service";

// Listar todos los artículos de una compra (por id_compra_inventario)
export const getAllProductoXCompras = async (req: Request, res: Response) => {
  try {
    const { id_compra_inventario } = req.query;
    if (!id_compra_inventario) {
      return res.status(400).json({ message: "Falta id_compra_inventario" });
    }

    const articulos = await articuloService.getArticulosByCompra(Number(id_compra_inventario));
    res.json(articulos);
  } catch (error) {
    console.error("Error al obtener artículos:", error);
    res.status(500).json({ message: "Error al obtener artículos" });
  }
};

// Obtener todos los id_axc por id_compra_inventario
export const getIdsAxCByCompra = async (req: Request, res: Response) => {
  try {
    const { id_compra_inventario } = req.params;
    const ids = await articuloService.getIdsAxCByCompra(Number(id_compra_inventario));
    res.json(ids);
  } catch (error) {
    console.error("Error al obtener IDs:", error);
    res.status(500).json({ message: "Error al obtener IDs" });
  }
};

// Obtener un artículo por ID
export const getProductoXCompraById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const articulo = await articuloService.getArticuloCompraById(Number(id));

    if (!articulo) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    res.json(articulo);
  } catch (error) {
    console.error("Error al obtener artículo:", error);
    res.status(500).json({ message: "Error al obtener artículo" });
  }
};

// Crear un nuevo artículo en la compra
export const createProductoXCompra = async (req: Request, res: Response) => {
  try {
    const nuevoArticulo = await articuloService.createArticuloCompra(req.body);
    res.status(201).json({ message: "Artículo creado correctamente", data: nuevoArticulo });
  } catch (error) {
    console.error("Error al crear artículo:", error);
    res.status(500).json({ message: "Error al crear artículo" });
  }
};

// Actualizar un artículo de la compra
export const updateProductoXCompra = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const articuloActualizado = await articuloService.updateArticuloCompra(Number(id), req.body);

    if (!articuloActualizado) {
      return res.status(404).json({ message: "Artículo no encontrado para actualizar" });
    }

    res.json({ message: "Artículo actualizado correctamente", data: articuloActualizado });
  } catch (error) {
    console.error("Error al actualizar artículo:", error);
    res.status(500).json({ message: "Error al actualizar artículo" });
  }
};

// Eliminar un artículo de la compra
export const deleteProductoXCompra = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await articuloService.deleteArticuloCompra(Number(id));

    res.json(result);
  } catch (error) {
    console.error("Error al eliminar artículo:", error);
    res.status(500).json({ message: "Error al eliminar artículo" });
  }
};
