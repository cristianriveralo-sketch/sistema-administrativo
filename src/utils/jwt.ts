import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "clave_por_defecto"; 

export const generarToken = (usuario: any) => {
  return jwt.sign(
    {
      id_usuario: usuario.id_usuario,
      username: usuario.username,
      id_persona: usuario.id_persona
    },
    SECRET_KEY,
    { expiresIn: "1h" } 
  );
};

export const verificarToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
