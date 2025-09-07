import { ArticuloVenta, Venta } from "../models";
import { ArticuloVentaDTO } from "./producto_x_venta.interface";

export interface VentaDTO {
  id_venta: number;
  id_cliente: string;
  id_usuario: string;
  valor_total: number;
  fecha: Date;
  articulosVenta?: ArticuloVentaDTO[];
}


export interface VentaConArticulos extends Venta {
  articulosVenta?: ArticuloVenta[];
}