import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export class ProductoCompleto extends Model {
  public id_pxc!: number;
  public id_producto!: number;
  public id_talla!: number;
  public id_color!: number;
  public cantidad!: number;
}

ProductoCompleto.init(
  {
    id_pxc: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    id_producto: { type: DataTypes.INTEGER.UNSIGNED },
    id_talla: { type: DataTypes.INTEGER.UNSIGNED },
    id_color: { type: DataTypes.INTEGER.UNSIGNED },
    precio: { type: DataTypes.DECIMAL(10, 3) },
    foto: { type: DataTypes.STRING(255) },
    cantidad: { type: DataTypes.DECIMAL(10, 2) },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { sequelize, tableName: "producto_x_completo", timestamps: false }
);
