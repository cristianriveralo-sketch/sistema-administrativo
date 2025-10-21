"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proveedor = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Proveedor extends sequelize_1.Model {
}
exports.Proveedor = Proveedor;
Proveedor.init({
    id_proveedor: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED, // ahora numérico
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, // auto-incrementable
    },
    razon_social: { type: sequelize_1.DataTypes.STRING(50), allowNull: false },
    marca: { type: sequelize_1.DataTypes.STRING(50), allowNull: false },
    id_persona: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "persona", key: "id_persona" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
}, { sequelize: database_1.default, tableName: "proveedor", timestamps: false });
