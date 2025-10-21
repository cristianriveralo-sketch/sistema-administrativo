"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Talla = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Talla extends sequelize_1.Model {
}
exports.Talla = Talla;
Talla.init({
    id_talla: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    talla: { type: sequelize_1.DataTypes.STRING(10) },
}, { sequelize: database_1.default, tableName: "talla", timestamps: false });
