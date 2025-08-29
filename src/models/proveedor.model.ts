import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface ProveedorAttributes {
  id_proveedor: string;
  nombre: string;
  marca: string;
}

interface ProveedorCreationAttributes
  extends Optional<ProveedorAttributes, "id_proveedor"> {}

export class Proveedor
  extends Model<ProveedorAttributes, ProveedorCreationAttributes>
  implements ProveedorAttributes
{
  public id_proveedor!: string;
  public nombre!: string;
  public marca!: string;
}

Proveedor.init(
  {
    id_proveedor: {
      type: DataTypes.CHAR(36),
      allowNull: false, 
      primaryKey: true, 
    },
    nombre: { type: DataTypes.STRING(50), allowNull: false },
    marca: { type: DataTypes.STRING(50), allowNull: false },
  },
  { sequelize, tableName: "proveedor", timestamps: false }
);

