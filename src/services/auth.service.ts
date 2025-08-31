import { Usuario } from "../models";

export const PostLoginUsuario = async (username: string, password: string) => {
  try {
    const usuario = await Usuario.findOne({ 
      where: { username, password },
      include: [{ model: Usuario.sequelize?.models.Persona, as: "persona" }]
    });

    return usuario; 
  } catch (error) {
    console.error("Error en loginUsuario:", error);
    throw error;
  }
};
