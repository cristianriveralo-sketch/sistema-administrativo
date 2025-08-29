import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface CategoriaAttributes {
  id_categoria: number;
  nombre: string;
  descripcion: string;
}

interface CategoriaCreationAttributes extends Optional<CategoriaAttributes, "id_categoria"> {}

export class Categoria extends Model<CategoriaAttributes, CategoriaCreationAttributes>
  implements CategoriaAttributes {
  public id_categoria!: number;
  public nombre!: string;
  public descripcion!: string;
}

Categoria.init(
  {
    id_categoria: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(50) },
    descripcion: { type: DataTypes.STRING(255) },
  },
  { sequelize, tableName: "categoria", timestamps: false }
);
