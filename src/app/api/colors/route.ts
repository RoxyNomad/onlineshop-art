import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export const GET = async () => {
  try {
    // Neon query liefert verschachteltes Array
    const result = await pool.query<{ base_color: string }[]>(
      `SELECT DISTINCT base_color FROM artworks WHERE base_color IS NOT NULL`
    );

    type DBColorRow = { base_color: string };
    const rows: DBColorRow[] = result[0];


    // Antwort: Array von Strings (Farbnamen)
    const colors = rows.map(r => r.base_color);

    return NextResponse.json(colors);
  } catch (err) {
    console.error("Fehler beim Abrufen der Farben:", err);
    return NextResponse.json({ error: "Error fetching colors" }, { status: 500 });
  }
};
