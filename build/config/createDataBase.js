"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatabaseIfNotExists = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Conexión temporal sin especificar DB
const tempSequelize = new sequelize_1.Sequelize("", // sin DB
process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "mysql",
    logging: false,
});
const createDatabaseIfNotExists = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield tempSequelize.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`);
        console.log(`✅ Base de datos '${process.env.DB_DATABASE}' creada o ya existente.`);
    }
    catch (error) {
        console.error("❌ Error creando la base de datos:", error);
        throw error;
    }
    finally {
        yield tempSequelize.close();
    }
});
exports.createDatabaseIfNotExists = createDatabaseIfNotExists;
