import { Request, Response } from "express";
import * as articuloVenta from "../services/producto_x_venta.service";

// Obtener todos los artículos de una venta
export const getAllProductoXVentas = async (req: Request, res: Response) => {
  try {
    const { id_venta } = req.query;
    if (!id_venta) {
      return res.status(400).json({ message: "Falta id_venta" });
    }

    const articulos = await articuloVenta.getArticuloByVenta(Number(id_venta));
    res.json(articulos);
  } catch (error) {
    console.error("Error al obtener artículos:", error);
    res.status(500).json({ message: "Error al obtener artículos" });
  }
};

// Obtener un artículo de venta por ID
export const getProductoXVentaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const articulo = await articuloVenta.getArticuloVentaById(Number(id));

    if (!articulo) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    res.json(articulo);
  } catch (error) {
    console.error("Error al obtener artículo:", error);
    res.status(500).json({ message: "Error al obtener artículo" });
  }
};

// Crear un artículo de venta
export const createProductoXVenta = async (req: Request, res: Response) => {
  try {
    const nuevoArticulo = await articuloVenta.createArticuloVenta(req.body);
    res.status(201).json({
      message: "ProductoXVenta creado correctamente",
      data: nuevoArticulo,
    });
  } catch (error: any) {
    console.error("Error al crear artículo de venta:", error);
    res.status(500).json({ message: error.message || "Error al crear artículo" });
  }
};

// Actualizar un artículo de venta
export const updateProductoXVenta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const articulo = await articuloVenta.updateArticuloVenta(Number(id), req.body);

    if (!articulo) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    res.json({
      message: `ProductoXVenta ${id} actualizado correctamente`,
      data: articulo,
    });
  } catch (error: any) {
    console.error("Error al actualizar artículo de venta:", error);
    res.status(500).json({ message: error.message || "Error al actualizar artículo" });
  }
};

// Eliminar un artículo de venta
export const deleteProductoXVenta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await articuloVenta.deleteArticuloVenta(Number(id));
    res.json(result);
  } catch (error: any) {
    console.error("Error al eliminar artículo de venta:", error);
    res.status(500).json({ message: error.message || "Error al eliminar artículo" });
  }
};
