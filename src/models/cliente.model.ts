import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export class Cliente extends Model {
  public id_cliente!: string;
  public direccion!: string;
  public id_persona!: number;
  public activo!: boolean;
  public fecha_creacion!: Date;
  public fecha_actualizacion!: Date;
}

Cliente.init(
  {
    id_cliente: { type: DataTypes.CHAR(36), allowNull: false, primaryKey: true },
    direccion: { type: DataTypes.STRING(100) },
    id_persona: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { 
    sequelize, 
    tableName: "cliente", 
    timestamps: true, 
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion" 
  }
);
