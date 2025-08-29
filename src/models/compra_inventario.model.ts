import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export class Compra extends Model {
  public id_compra_inventario!: number;
  public id_proveedor!: string;
  public id_usuario!: string;
  public valor_total!: number;
  public fecha!: Date;
}

Compra.init(
  {
    id_compra_inventario: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_proveedor: {
      type: DataTypes.CHAR(36),
      allowNull: true, 
      references: {
        model: "proveedor",
        key: "id_proveedor",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },

    id_usuario: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: "usuario",
        key: "id_usuario",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    valor_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize, tableName: "compra_inventario", timestamps: false }
);
