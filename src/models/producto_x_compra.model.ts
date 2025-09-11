import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import { ProductoCompleto } from "./producto_x_completo.model";

export class ArticuloCompra extends Model {
  public id_axc!: number;
  public id_compra_inventario!: number;
  public id_pxc!: number;
  public cantidad!: number;
  public precio_unitario!: number;
  public productoCompra?: ProductoCompleto;
}



ArticuloCompra.init(
  {
    id_axc: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_compra_inventario: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    id_pxc: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  { sequelize, tableName: "articulo_x_compra", timestamps: false }
);
