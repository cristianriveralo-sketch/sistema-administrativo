"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
const database_1 = __importDefault(require("../config/database"));
class Usuario extends sequelize_1.Model {
}
exports.Usuario = Usuario;
Usuario.init({
    id_usuario: {
        type: sequelize_1.DataTypes.CHAR(36),
        defaultValue: uuid_1.v4,
        allowNull: false,
        primaryKey: true,
    },
    username: { type: sequelize_1.DataTypes.STRING(20), allowNull: false },
    password: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    avatar: { type: sequelize_1.DataTypes.STRING(255) },
    activo: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: true },
    id_persona: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "persona", key: "id_persona" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
}, {
    sequelize: database_1.default,
    tableName: "usuario",
    timestamps: true, // ✅ activa createdAt / updatedAt
    createdAt: "fecha_creacion", // renombramos columna
    updatedAt: "fecha_actualizacion", // renombramos columna
});
