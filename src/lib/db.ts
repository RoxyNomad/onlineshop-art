/* eslint-disable @typescript-eslint/no-explicit-any */
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config();

/**
 * ✅ Initialize the Neon database client.
 * This instance will be used across the repository layer.
 */
const neonClient = neon(process.env.NEON_DB_URL!);

/**
 * Generic, type-safe query function for Neon.
 *
 * Supports:
 * 1️⃣ Template literals → query`SELECT * FROM table WHERE id = ${id}`
 * 2️⃣ String + parameters → query("SELECT * FROM table WHERE id = $1", [id])
 *
 * @template T - The expected return type of the query result.
 * @param textOrTemplate - SQL query as template literal or string.
 * @param params - Optional array of parameters.
 * @returns Promise resolving to typed query results.
 */
export async function query<T>(
  textOrTemplate: string | TemplateStringsArray,
  params?: any[]
): Promise<T[]> {
  try {
    // ✅ Case 1: Template literal
    if (Array.isArray(textOrTemplate) && "raw" in textOrTemplate) {
      const result = await (neonClient as any)(textOrTemplate, ...(params || []));
      return result as T[];
    }

    // ✅ Case 2: Regular SQL with placeholders
    if (typeof textOrTemplate === "string") {
      const sql = textOrTemplate;
      const result = await (neonClient as any)(
        [sql] as unknown as TemplateStringsArray,
        ...(params || [])
      );
      return result as T[];
    }

    throw new Error("Invalid SQL input: must be string or template literal");
  } catch (error) {
    console.error("❌ Database query error:", error);
    throw new Error("Error executing database query");
  }
}

/**
 * ✅ A lightweight wrapper that mimics a connection pool interface.
 * This helps keeping repository methods compatible with other database clients (like Prisma or PostgreSQL).
 */
export const pool = {
  query: <T>(text: string | TemplateStringsArray, params?: any[]) =>
    query<T>(text, params),
};

export default pool;
