export interface productoCompletoDTO {
    id_producto: number;
    id_talla: number;
    id_color: number;
    precio: number;
    foto: string;
    cantidad: number;
    activo?: boolean;
}