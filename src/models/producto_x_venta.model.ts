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
    id_axv: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_venta: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    id_pxc: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    cantidad_vendida: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  { sequelize, tableName: "articulo_x_venta", timestamps: false }
);
