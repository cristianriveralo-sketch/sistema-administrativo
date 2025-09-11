import { productoCompletoDTO } from "./producto_x_completo.interface";

export interface ArticuloVentaDTO {
  id_axv: number;
  id_venta:number;
  id_pxc: number;
  cantidad_vendida: number;
  precio_unitario: number;
  productoVenta?: productoCompletoDTO;
}