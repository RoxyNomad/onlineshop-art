import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/shared/infrastructure/db/client";
import * as schema from "@/shared/infrastructure/db/schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: { ...schema }
    }),
    emailAndPassword: {  
        enabled: true,
    },
    // KEINE plugins: [ dash() ] hier!
});