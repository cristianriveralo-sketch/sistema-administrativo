import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export class ArticuloVenta extends Model {
  public id_axv!: number;
  public id_venta!: number;
  public id_pxc!: number;
  public cantidad_vendida!: number;
  public precio_unitario!: number;
}

ArticuloVenta.init(
  {
    id_axv: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    cantidad_vendida: { type: DataTypes.INTEGER },
    precio_unitario: { type: DataTypes.DECIMAL(10, 2) },
  },
  { sequelize, tableName: "articulo_x_venta", timestamps: false }
);
