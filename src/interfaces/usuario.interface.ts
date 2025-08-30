export interface CreateUsuarioDTO {
  usuario: {
    username: string;
    password: string;
    avatar?: string;
    activo?: boolean;
  };
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

export interface UpdateUsuarioDTO {
  usuario?: {
    username?: string;
    password?: string;
    avatar?: string;
    activo?: boolean;
    fecha_creacion?: string;
  };
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

