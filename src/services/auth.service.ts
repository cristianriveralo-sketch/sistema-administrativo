import { Usuario } from "../models";
import bcrypt from "bcrypt";

export const PostLoginUsuario = async (username: string, password: string) => {
  try {
    //console.log("username:", username);
    //console.log("Password enviado:", password);
    

    // buscar solo por username
    const usuario = await Usuario.findOne({
      where: { username },
      include: [{ model: Usuario.sequelize?.models.Persona, as: "persona" }],
    });

    if (!usuario) {
      return null;
    }

    // comparar password
    const passwordValido = await bcrypt.compare(password, usuario.password);

    if (!passwordValido) {
      return null;
    }

    return usuario;
  } catch (error) {
    console.error("Error en loginUsuario:", error);
    throw error;
  }
};
