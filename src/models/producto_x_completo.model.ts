import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface ProductoCompletoAttributes {
  id_pxc: number;
  id_producto: number;
  id_talla: number;
  id_color: number;
  precio: number;
  foto: string;
  cantidad: number;
  activo: boolean;
}

interface ProductoCompletoCreationAttributes extends Optional<ProductoCompletoAttributes, "id_pxc" | "activo"> {}

export class ProductoCompleto extends Model<ProductoCompletoAttributes, ProductoCompletoCreationAttributes>
  implements ProductoCompletoAttributes {
  public id_pxc!: number;
  public id_producto!: number;
  public id_talla!: number;
  public id_color!: number;
  public precio!: number;
  public foto!: string;
  public cantidad!: number;
  public activo!: boolean;
}

ProductoCompleto.init(
  {
    id_pxc: { 
      type: DataTypes.INTEGER.UNSIGNED, 
      autoIncrement: true, 
      primaryKey: true 
    },
    id_producto: { 
      type: DataTypes.INTEGER.UNSIGNED, 
      allowNull: false,
      references: { model: "producto", key: "id_producto" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    id_talla: { 
      type: DataTypes.INTEGER.UNSIGNED, 
      allowNull: false,
      references: { model: "talla", key: "id_talla" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    id_color: { 
      type: DataTypes.INTEGER.UNSIGNED, 
      allowNull: false,
      references: { model: "color", key: "id_color" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    precio: { type: DataTypes.DECIMAL(10, 3) },
    foto: { type: DataTypes.STRING(255) },
    cantidad: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { 
    sequelize, 
    tableName: "producto_x_completo", 
    timestamps: false 
  }
);
