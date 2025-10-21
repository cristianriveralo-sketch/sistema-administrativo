import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface PersonaAttributes {
  id_persona: number;
  nombre: string;
  apellido: string;
  genero: string;
  cedula: string;
  email: string;
  telefono: number;
  ciudad: string;
  edad: number;
  id_pais: number;   
}

interface PersonaCreationAttributes extends Optional<PersonaAttributes, "id_persona"> {}

export class Persona extends Model<PersonaAttributes, PersonaCreationAttributes>
  implements PersonaAttributes {
  public id_persona!: number;
  public nombre!: string;
  public apellido!: string;
  public genero!: string;
  public cedula!: string;
  public email!: string;
  public telefono!: number;
  public ciudad!: string;
  public edad!: number;
  public id_pais!: number;
}

Persona.init(
  {
    id_persona: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(20) },
    apellido: { type: DataTypes.STRING(20) },
    genero: { type: DataTypes.STRING(20) },
    cedula: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(45), allowNull: false, unique: true },
    telefono: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    ciudad: { type: DataTypes.STRING(25) },
    edad: { type: DataTypes.INTEGER },
    id_pais: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "pais", key: "id_pais" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  { sequelize, tableName: "persona", timestamps: false }
);
