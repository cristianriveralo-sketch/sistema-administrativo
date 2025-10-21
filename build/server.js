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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database"));
const routes_1 = __importDefault(require("./routes/routes"));
require("./models");
const createDataBase_1 = require("./config/createDataBase");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Application port (Express)
const port = Number(process.env.PORT) || 3000;
// routes
app.use(routes_1.default);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running on port ${port}`);
    try {
        // Crear la base de datos si no existe
        yield (0, createDataBase_1.createDatabaseIfNotExists)();
        // Conectar a la base de datos
        yield database_1.default.authenticate();
        console.log(`Connection has been established successfully: ${process.env.DB_DATABASE}`);
        yield database_1.default.sync({ alter: true }); // Use { force: true } to reset tables
        console.log("📦 Models synchronized successfully");
    }
    catch (error) {
        console.error("❌ Unable to connect to the database:", error);
    }
}));
