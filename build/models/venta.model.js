"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venta = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Venta extends sequelize_1.Model {
}
exports.Venta = Venta;
Venta.init({
    id_venta: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    id_cliente: { type: sequelize_1.DataTypes.CHAR(36), allowNull: false },
    id_usuario: { type: sequelize_1.DataTypes.CHAR(36), allowNull: false },
    valor_total: { type: sequelize_1.DataTypes.DECIMAL(10, 3), allowNull: false },
    fecha: { type: sequelize_1.DataTypes.DATE, allowNull: false },
}, { sequelize: database_1.default, tableName: "venta", timestamps: false });
