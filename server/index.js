import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the correct path
const envPath = path.resolve(__dirname, ".env");
dotenv.config({ path: envPath });

import http from "http";
import app from "./app.js";
import { initializeDatabase } from "./config/database.js";
// import { initReportSchedulers } from "./services/reportScheduler.js";
// import { initHrmsScheduler } from "./services/hrmsScheduler.js";

const port = Number(process.env.PORT) || 3000;

async function start() {
  try {
    await initializeDatabase();
    console.log("Database connected successfully");
    // initReportSchedulers();
    // initHrmsScheduler();
  } catch (error) {
    console.warn(
      "Database connection failed, but server will start anyway:",
      error.message
    );
  }

  const server = http.createServer(app);
  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port:${port}`);
    // console.log(`Client application available at http://localhost:${port}`);
  });
}

start().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server:", error);
  process.exit(1);
});
