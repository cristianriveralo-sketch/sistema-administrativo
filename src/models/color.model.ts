import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface ColorAttributes {
  id_color: number;
  color: string;
}

interface ColorCreationAttributes extends Optional<ColorAttributes, "id_color"> {}

export class Color extends Model<ColorAttributes, ColorCreationAttributes> implements ColorAttributes {
  public id_color!: number;
  public color!: string;
}

Color.init(
  {
    id_color: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    color: { type: DataTypes.STRING(50) },
  },
  { sequelize, tableName: "color", timestamps: false }
);
