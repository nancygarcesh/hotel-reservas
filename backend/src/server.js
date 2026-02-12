import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/connection.js";
import { configureApp } from "./config/appConfig.js";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import { syncModels } from "./database/syncModels.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swaggerConfig.js";

dotenv.config();

const app = express();

configureApp(app);

app.use("/api", routes);
app.use(errorHandler);
app.use("/uploads", express.static("src/uploads"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB();
  await syncModels();

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  });
};

startServer();