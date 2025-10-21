"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Cliente extends sequelize_1.Model {
}
exports.Cliente = Cliente;
Cliente.init({
    id_cliente: { type: sequelize_1.DataTypes.CHAR(36), allowNull: false, primaryKey: true },
    direccion: { type: sequelize_1.DataTypes.STRING(100) },
    id_persona: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    activo: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: true },
}, {
    sequelize: database_1.default,
    tableName: "cliente",
    timestamps: true,
    createdAt: "fecha_creacion",
    updatedAt: "fecha_actualizacion"
});
