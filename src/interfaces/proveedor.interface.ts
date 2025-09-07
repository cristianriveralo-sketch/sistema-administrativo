export interface ProveedorDTO {
  proveedor: {
    razon_social: string;
    marca: string;
  };
  persona: {
    id_persona: number;
  };
}


export interface CreateProveedorDTO {
  proveedor: { razon_social: string; marca: string };
  persona: {
    nombres: string;
    apellidos: string;
    correo: string;
    telefono?: number;
    genero?: string;
    ciudad?: string;
    edad?: number;
    id_pais?: number;
  };
}

export interface UpdateProveedorDTO {
  proveedor?: { razon_social?: string; marca?: string; };
  persona?: {
    nombres?: string;
    apellidos?: string;
    correo?: string;
    telefono?: number;
    genero?: string;
    ciudad?: string;
    edad?: number;
    id_pais?: number;
  };
}
