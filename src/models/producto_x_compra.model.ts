import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export class ArticuloCompra extends Model {
  public id_pxcompra!: number;
  public id_compra_inventario!: number;
  public id_pxc!: number;
  public cantidad!: number;
  public precio_unitario!: number;
}

ArticuloCompra.init(
  {
    id_pxcompra: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    cantidad: { type: DataTypes.INTEGER },
    precio_unitario: { type: DataTypes.DECIMAL(10, 2) },
  },
  { sequelize, tableName: "articulo_x_compra", timestamps: false }
);
