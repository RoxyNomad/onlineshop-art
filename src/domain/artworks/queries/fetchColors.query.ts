import { query } from "@/infrastructure/providers/db/db";

/**
 * Fetch all distinct base colors from artworks table.
 * Returns a string array directly.
 */
const fetchColors = async (): Promise<string[]> => {
  try {
    const result = await query<{ base_color: string }>(
      "SELECT DISTINCT base_color FROM artworks WHERE base_color IS NOT NULL"
    );
    return result.map((row) => row.base_color);
  } catch (error) {
    console.error("Error fetching colors:", error);
    return [];
  }
};

export default fetchColors;
