"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pais = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Pais extends sequelize_1.Model {
}
exports.Pais = Pais;
Pais.init({
    id_pais: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    nombre: { type: sequelize_1.DataTypes.STRING(50), allowNull: false },
    codigo: { type: sequelize_1.DataTypes.STRING(5), allowNull: false }
}, { sequelize: database_1.default, tableName: "pais", timestamps: false });
