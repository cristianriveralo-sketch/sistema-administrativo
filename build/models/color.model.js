"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Color extends sequelize_1.Model {
}
exports.Color = Color;
Color.init({
    id_color: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    color: { type: sequelize_1.DataTypes.STRING(50), allowNull: false },
}, { sequelize: database_1.default, tableName: "color", timestamps: false });
