import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME || "refex_renewables",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "muruku",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: false,
  }
);

export async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    // Models import must come after sequelize is created to bind associations
    const { applyAssociations } = await import("../models/index.js");
    applyAssociations();
    // Use sync without alter to avoid MySQL "Too many keys" error
    // This will create tables if they don't exist but won't alter existing ones
    await sequelize.sync({ alter: false });
  } catch (error) {
    throw error;
  }
}
