"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Producto extends sequelize_1.Model {
}
exports.Producto = Producto;
Producto.init({
    id_producto: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: { type: sequelize_1.DataTypes.STRING(25) },
    descripcion: { type: sequelize_1.DataTypes.STRING(255) },
    instrucciones_de_cuidado: { type: sequelize_1.DataTypes.STRING(255) },
    cantidad_stock: { type: sequelize_1.DataTypes.INTEGER },
    id_categoria: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
}, {
    sequelize: database_1.default,
    tableName: "producto",
    timestamps: false
});
