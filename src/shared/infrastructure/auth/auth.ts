// src/shared/infrastructure/auth/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/shared/infrastructure/db/client";
import * as schema from "@/shared/infrastructure/db/schema";
import { dash } from "@better-auth/infra"; // Falls du das Plugin installiert hast

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            ...schema,
        }
    }),
    emailAndPassword: {  
        enabled: true,
    },
    plugins: [
        dash() // Optionales Infrastruktur-Dashboard-Plugin
    ]
});