import { Usuario } from "../models";

export const PostLoginUsuario = async (username: string, password: string) => {
  try {
    // Buscar usuario por username y password exactos
    const usuario = await Usuario.findOne({ 
      where: { username, password },
      include: [{ model: Usuario.sequelize?.models.Persona, as: "persona" }]
    });

    return usuario; // null si no encontró usuario
  } catch (error) {
    console.error("Error en loginUsuario:", error);
    throw error;
  }
};
