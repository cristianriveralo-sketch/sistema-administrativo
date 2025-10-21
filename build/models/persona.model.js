"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Persona = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Persona extends sequelize_1.Model {
}
exports.Persona = Persona;
Persona.init({
    id_persona: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    nombre: { type: sequelize_1.DataTypes.STRING(20) },
    apellido: { type: sequelize_1.DataTypes.STRING(20) },
    genero: { type: sequelize_1.DataTypes.STRING(20) },
    cedula: { type: sequelize_1.DataTypes.STRING(20), allowNull: false, unique: true },
    email: { type: sequelize_1.DataTypes.STRING(45), allowNull: false, unique: true },
    telefono: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, unique: true },
    ciudad: { type: sequelize_1.DataTypes.STRING(25) },
    edad: { type: sequelize_1.DataTypes.INTEGER },
    id_pais: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "pais", key: "id_pais" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
}, { sequelize: database_1.default, tableName: "persona", timestamps: false });
