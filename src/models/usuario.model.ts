import { Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../config/database";
import { Persona } from "./persona.model";

export class Usuario extends Model {
  public id_usuario!: string;
  public username!: string;
  public password!: string;
  public avatar!: string;
  public activo!: boolean;
  public fecha_creacion!: Date; // alias de createdAt
  public fecha_actualizacion!: Date; // alias de updatedAt
  public id_persona!: number;

  public persona?: Persona;
}

Usuario.init(
  {
    id_usuario: {
      type: DataTypes.CHAR(36),
      defaultValue: uuidv4,
      allowNull: false,
      primaryKey: true,
    },
    username: { type: DataTypes.STRING(20), allowNull: false },
    password: { type: DataTypes.STRING(20), allowNull: false },
    avatar: { type: DataTypes.STRING(255) },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    id_persona: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "persona", key: "id_persona" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  { 
    sequelize,
    tableName: "usuario",
    timestamps: true, // ✅ activa createdAt / updatedAt
    createdAt: "fecha_creacion", // renombramos columna
    updatedAt: "fecha_actualizacion", // renombramos columna
  }
);
