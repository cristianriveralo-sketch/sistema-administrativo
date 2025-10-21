"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoCompleto = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class ProductoCompleto extends sequelize_1.Model {
}
exports.ProductoCompleto = ProductoCompleto;
ProductoCompleto.init({
    id_pxc: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    id_producto: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "producto", key: "id_producto" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    id_talla: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "talla", key: "id_talla" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    id_color: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "color", key: "id_color" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    precio: { type: sequelize_1.DataTypes.DECIMAL(10, 3) },
    foto: { type: sequelize_1.DataTypes.STRING(255) },
    cantidad: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    activo: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: true },
}, {
    sequelize: database_1.default,
    tableName: "producto_x_completo",
    timestamps: false
});
