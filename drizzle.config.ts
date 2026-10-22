import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Lade .env.local
dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/shared/infrastructure/db/schema.ts", // Sammler aller Schemas
  out: "./drizzle/migrations",                          // Output für Migrationen
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});