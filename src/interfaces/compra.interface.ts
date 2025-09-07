import { Compra } from "../models";
import { ArticuloCompraDTO } from "./producto_x_compra.interface";
import { ProveedorDTO } from "./proveedor.interface";  

export interface CompraDTO {
  id_compra_inventario: number;
  id_proveedor?: string | null;
  id_usuario: string;
  valor_total: number;
  fecha: Date;
  articulosCompra?: ArticuloCompraDTO[];
  proveedor?: ProveedorDTO;   
}

export interface CompraConArticulos extends Compra {
  articulosCompra?: ArticuloCompraDTO[];
  proveedor?: ProveedorDTO;   
  usuario?: any;              
}
