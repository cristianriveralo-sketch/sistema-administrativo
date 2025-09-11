import { Cliente, Persona } from "../models";

export interface CreateClienteDTO {
    cliente: { direccion: string , activo?: boolean };
    persona: {
        nombre: string;
        apellido: string;
        correo: string;
        telefono?: number;
        genero?: string;
        ciudad?: string;
        edad?: number;
        id_pais?: number;
    };
}

export interface UpdateClienteDTO {
    cliente?: { direccion?: string, activo?: boolean };
    persona?: {
        nombre?: string;
        apellido?: string;
        email?: string;
        telefono?: number;
        genero?: string;
        ciudad?: string;
        edad?: number;
        id_pais?: number;
    };
}



export interface ClienteConPersona extends Cliente {
  persona: Persona;
}
