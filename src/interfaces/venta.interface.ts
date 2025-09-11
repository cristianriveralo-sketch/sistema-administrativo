import { ArticuloVenta, Venta } from "../models";
import { ClienteConPersona, CreateClienteDTO } from "./cliente.interface";
import { ArticuloVentaDTO } from "./producto_x_venta.interface";

export interface VentaDTO {
  id_venta: number;
  id_cliente: string;
  id_usuario: string;
  valor_total: number;
  fecha: Date;
  articulosVenta?: ArticuloVentaDTO[];
  cliente?: CreateClienteDTO;
}


export interface VentaConArticulos extends Venta {
  articulosVenta?: ArticuloVenta[];
  cliente?: ClienteConPersona;
  usuario?: any;   
}