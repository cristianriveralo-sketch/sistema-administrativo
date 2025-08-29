import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface TallaAttributes {
  id_talla: number;
  talla: string;
}

interface TallaCreationAttributes extends Optional<TallaAttributes, "id_talla"> {}

export class Talla extends Model<TallaAttributes, TallaCreationAttributes> implements TallaAttributes {
  public id_talla!: number;
  public talla!: string;
}

Talla.init(
  {
    id_talla: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    talla: { type: DataTypes.STRING(10) },
  },
  { sequelize, tableName: "talla", timestamps: false }
);
