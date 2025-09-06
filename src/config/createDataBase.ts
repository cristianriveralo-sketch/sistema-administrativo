import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Conexión temporal sin especificar DB
const tempSequelize = new Sequelize(
  "", // sin DB
  process.env.DB_USER as string,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "mysql",
    logging: false,
  }
);

export const createDatabaseIfNotExists = async () => {
  try {
    await tempSequelize.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`
    );
    console.log(`✅ Base de datos '${process.env.DB_DATABASE}' creada o ya existente.`);
  } catch (error) {
    console.error("❌ Error creando la base de datos:", error);
    throw error;
  } finally {
    await tempSequelize.close();
  }
};
