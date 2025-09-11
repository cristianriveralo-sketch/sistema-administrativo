import { Optional } from "sequelize";
import { productoCompletoDTO } from "./producto_x_completo.interface";

export interface ArticuloCompraDTO {
  id_axc?: number; 
  id_compra_inventario: number;
  id_pxc: number;
  cantidad: number;
  precio_unitario: number;
  productoCompra?: productoCompletoDTO;
}


