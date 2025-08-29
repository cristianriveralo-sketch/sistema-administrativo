import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export class Cliente extends Model {
  public id_cliente!: string;
  public fecha_registro!: Date;
  public direccion!: string;
  public id_pais!: number;
  public id_persona!: number;
}

Cliente.init(
  {
    id_cliente: { type: DataTypes.CHAR(36), allowNull: false, primaryKey: true },
    fecha_registro: { type: DataTypes.DATE },
    direccion: { type: DataTypes.STRING(100) },
    id_pais: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    id_persona: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  },
  { sequelize, tableName: "cliente", timestamps: false }
);

