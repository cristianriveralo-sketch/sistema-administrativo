import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export class Venta extends Model {
  public id_venta!: number;
  public id_cliente!: string;
  public id_usuario!: string;
  public valor_total!: number;
  public fecha!: Date;
}

Venta.init(
  {
    id_venta: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    id_cliente: { type: DataTypes.CHAR(36), allowNull: false }, 
    id_usuario: { type: DataTypes.CHAR(36), allowNull: false }, 
    valor_total: { type: DataTypes.DECIMAL(10, 3), allowNull: false },
    fecha: { type: DataTypes.DATE, allowNull: false },
  },
  { sequelize, tableName: "venta", timestamps: false }
);
