import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "src/infrastructure/providers/db/prisma/schema.prisma",
  migrations: {
    path: "src/infrastructure/providers/db/prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
