/* eslint-disable @typescript-eslint/no-explicit-any */
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

// ✅ Initialize Neon client
const neonClient = neon(process.env.NEON_DB_URL!);

/**
 * Safe database query wrapper.
 * Works with either:
 * 1️⃣ Template literals → query`SELECT * FROM users WHERE id = ${id}`
 * 2️⃣ String + parameters → query("SELECT * FROM users WHERE id = $1", [id])
 */
export async function query<T>(
  textOrTemplate: string | TemplateStringsArray,
  params?: any[]
): Promise<T[]> {
  try {
    if (Array.isArray(textOrTemplate) && "raw" in textOrTemplate) {
      // ✅ Case 1: Template literal usage
      const result = await (neonClient as any)(textOrTemplate, ...(params || []));
      return result as T[];
    } else if (typeof textOrTemplate === "string") {
      // ✅ Case 2: Regular SQL string with placeholders
      const sql = textOrTemplate;
      const result = await (neonClient as any)([sql] as unknown as TemplateStringsArray, ...(params || []));
      return result as T[];
    } else {
      throw new Error("Invalid SQL input: must be string or template literal");
    }
  } catch (error) {
    console.error("❌ Database query error:", error);
    throw new Error("Error executing database query");
  }
}

// ✅ Backwards-compatible pool-like object
export const pool = { query };
export default pool;