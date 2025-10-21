"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compra = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Compra extends sequelize_1.Model {
}
exports.Compra = Compra;
Compra.init({
    id_compra_inventario: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    id_proveedor: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: "proveedor",
            key: "id_proveedor",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
    id_usuario: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false,
        references: {
            model: "usuario",
            key: "id_usuario",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    valor_total: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, { sequelize: database_1.default, tableName: "compra_inventario", timestamps: false });
