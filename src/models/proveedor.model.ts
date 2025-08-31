import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface ProveedorAttributes {
  id_proveedor: number;
  razon_social: string;
  marca: string;
  id_persona?: number;
}

interface ProveedorCreationAttributes
  extends Optional<ProveedorAttributes, "id_proveedor"> {}

export class Proveedor
  extends Model<ProveedorAttributes, ProveedorCreationAttributes>
  implements ProveedorAttributes
{
  public id_proveedor!: number;
  public razon_social!: string;
  public marca!: string;
  public id_persona?: number;
}

Proveedor.init(
  {
    id_proveedor: {
      type: DataTypes.INTEGER.UNSIGNED, // ahora numérico
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, // auto-incrementable
    },
    razon_social: { type: DataTypes.STRING(50), allowNull: false },
    marca: { type: DataTypes.STRING(50), allowNull: false },
    id_persona: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "persona", key: "id_persona" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  { sequelize, tableName: "proveedor", timestamps: false }
);
