// src/shared/infrastructure/auth/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/shared/infrastructure/db/client";
import * as schema from "@/shared/infrastructure/db/schema";
import { dash } from "@better-auth/infra";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: { ...schema }
    }),
    // Hier explizit übergeben:
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL || "https://onlineshop-art.vercel.app",
    
    emailAndPassword: {  
        enabled: true,
    },
    plugins: [
        dash({
            apiKey: process.env.BETTER_AUTH_API_KEY,
        })
    ]
});