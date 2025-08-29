import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface PersonaAttributes {
  id_persona: number;
  nombre: string;
  apellido: string;
  genero: string;
  email: string;
  telefono: number;
  ciudad: string;
  edad: number;
}

interface PersonaCreationAttributes extends Optional<PersonaAttributes, "id_persona"> {}

export class Persona extends Model<PersonaAttributes, PersonaCreationAttributes>
  implements PersonaAttributes {
  public id_persona!: number;
  public nombre!: string;
  public apellido!: string;
  public genero!: string;
  public email!: string;
  public telefono!: number;
  public ciudad!: string;
  public edad!: number;
}

Persona.init(
  {
    id_persona: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(20) },
    apellido: { type: DataTypes.STRING(20) },
    genero: { type: DataTypes.STRING(20) },
    email: { type: DataTypes.STRING(45) },
    telefono: { type: DataTypes.INTEGER },
    ciudad: { type: DataTypes.STRING(25) },
    edad: { type: DataTypes.INTEGER },
  },
  { sequelize, tableName: "persona", timestamps: false }
);
