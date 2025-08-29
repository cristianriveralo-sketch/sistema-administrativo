import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export class Usuario extends Model {
  public id_usuario!: string;
  public username!: string;
  public password!: string;
  public avatar!: string;
  public activo!: boolean;
  public fecha_creacion!: Date;
  public id_pais!: number;
  public id_persona!: number;
}

Usuario.init(
  {
    id_usuario: {
      type: DataTypes.CHAR(36),
      allowNull: false, 
      primaryKey: true, 
    },
    username: { type: DataTypes.STRING(20) },
    password: { type: DataTypes.STRING(20) },
    avatar: { type: DataTypes.STRING(255) },
    activo: { type: DataTypes.BOOLEAN },
    fecha_creacion: { type: DataTypes.DATE },
    id_pais: { 
      type: DataTypes.INTEGER.UNSIGNED, 
      allowNull: false,
      references: { model: "pais", key: "id_pais" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    id_persona: { 
      type: DataTypes.INTEGER.UNSIGNED, 
      allowNull: false,
      references: { model: "persona", key: "id_persona" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  { sequelize, tableName: "usuario", timestamps: false }
);

