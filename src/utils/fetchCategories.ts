import { neon } from "@neondatabase/serverless";

/**
 * Fetches all photography categories from Neon (PostgreSQL).
 * Returns an array of categories with id and name.
 */
export async function fetchCategories() {
    const sql = neon(process.env.NEON_DB_URL!);

    try {
        // Query all categories from your table
        const categories = await sql`
      SELECT id, name FROM categories ORDER BY name ASC;
    `;
        return categories;
    } catch (error) {
        console.error("Error fetching categories from Neon:", error);
        return [];
    }
}