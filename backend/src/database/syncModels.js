import { sequelize } from "../models/index.js";

export const syncModels = async () => {
  try {
    await sequelize.sync();
    console.log("📦 Modelos sincronizados");
  } catch (error) {
    console.error("Error sincronizando modelos", error);
  }
};