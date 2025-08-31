import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/database";
import routes from "./routes/routes";
import "./models";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Application port (Express)
const port = Number(process.env.PORT) || 3000;

// routes
app.use(routes);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);

  try {
    await sequelize.authenticate();
    console.log(
      `Connection has been established successfully: ${process.env.DB_DATABASE}`
    );
    
    await sequelize.sync({ alter: true}); // Use { force: true } to reset tables
    console.log("📦 Models synchronized successfully");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
});
