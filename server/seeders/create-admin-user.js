import bcrypt from "bcryptjs";
import { sequelize } from "../config/database.js";
import "../models/index.js"; // Initialize models
import { User } from "../models/index.js";

async function createAdminUser() {
  try {
    await sequelize.authenticate();
    console.log("Database connected for seeding");
    
    // Sync models to ensure tables exist
    await sequelize.sync();

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email: "murugesh.k@refex.co.in" } });
    if (existingUser) {
      console.log("User already exists:", existingUser.email);
      return;
    }

    // Create admin user: Murugesh Kumar
    const hashedPassword = await bcrypt.hash("RefexAdmin@", 10);
    const adminUser = await User.create({
      email: "murugesh.k@refex.co.in",
      username: "murugesh",
      passwordHash: hashedPassword,
      name: "Murugesh Kumar",
      role: "admin",
    });

    console.log("User created successfully:", {
      id: adminUser.id,
      name: adminUser.name,
      email: adminUser.email,
      role: adminUser.role,
    });
  } catch (error) {
    console.error("Error creating admin user:", error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

createAdminUser()
  .then(() => {
    console.log("Seeding completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });

