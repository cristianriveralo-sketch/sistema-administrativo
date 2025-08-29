import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface PaisAttributes {
  id_pais: number;
  nombre: string;
}

interface PaisCreationAttributes extends Optional<PaisAttributes, "id_pais"> {}

export class Pais extends Model<PaisAttributes, PaisCreationAttributes> implements PaisAttributes {
  public id_pais!: number;
  public nombre!: string;
}

Pais.init(
  {
    id_pais: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(50), allowNull: false },
  },
  { sequelize, tableName: "pais", timestamps: false }
);
