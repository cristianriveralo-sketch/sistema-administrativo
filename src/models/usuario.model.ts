import { Model, DataTypes, Optional } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../config/database";
import { Persona } from "./persona.model";

export class Usuario extends Model {
  public id_usuario!: string;
  public username!: string;
  public password!: string;
  public avatar!: string;
  public activo!: boolean;
  public fecha_creacion!: Date;
  public id_persona!: number;

  // 👇 esto es lo que TS necesita
  public persona?: Persona;
}

Usuario.init(
  {
    id_usuario: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      allowNull: false,
      primaryKey: true,
    },
    username: { type: DataTypes.STRING(20) },
    password: { type: DataTypes.STRING(20) },
    avatar: { type: DataTypes.STRING(255) },
    activo: { type: DataTypes.BOOLEAN },
    fecha_creacion: { type: DataTypes.DATE },
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

