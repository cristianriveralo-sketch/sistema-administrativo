"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categoria = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Categoria extends sequelize_1.Model {
}
exports.Categoria = Categoria;
Categoria.init({
    id_categoria: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    nombre: { type: sequelize_1.DataTypes.STRING(50) },
    descripcion: { type: sequelize_1.DataTypes.STRING(255) },
}, { sequelize: database_1.default, tableName: "categoria", timestamps: false });
