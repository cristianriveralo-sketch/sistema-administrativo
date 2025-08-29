import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface ProductoAttributes {
  id_producto: number;
  nombre: string;
  descripcion: string;
  instrucciones_de_cuidado: string;
  cantidad_stock: number;
  id_categoria: number;
}

interface ProductoCreationAttributes extends Optional<ProductoAttributes, "id_producto"> {}

export class Producto extends Model<ProductoAttributes, ProductoCreationAttributes>
  implements ProductoAttributes {
  public id_producto!: number;
  public nombre!: string;
  public descripcion!: string;
  public instrucciones_de_cuidado!: string;
  public cantidad_stock!: number;
  public id_categoria!: number;
}

Producto.init(
  {
    id_producto: { 
      type: DataTypes.INTEGER.UNSIGNED, 
      autoIncrement: true, 
      primaryKey: true 
    },
    nombre: { type: DataTypes.STRING(25) },
    descripcion: { type: DataTypes.STRING(255) },
    instrucciones_de_cuidado: { type: DataTypes.STRING(255) },
    cantidad_stock: { type: DataTypes.INTEGER },
    id_categoria: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }, 
  },
  { 
    sequelize, 
    tableName: "producto", 
    timestamps: false 
  }
);

