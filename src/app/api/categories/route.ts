import { NextResponse } from "next/server";
import { pool } from "@/infrastructure/providers/db/db";

// GET: Alle Kategorien holen
export const GET = async () => {
  try {
    // query ausführen, Typ angeben
    const result = await pool.query<{ id: number; name: string }[]>(
      "SELECT id, name FROM categories ORDER BY name ASC"
    );

    const categories = result[0].map((cat) => ({
      id: cat.id.toString(),
      name: cat.name,
    }));

    // result.rows existiert nicht direkt bei Neon, daher casten
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Error fetching categories" }, { status: 500 });
  }
};

// POST: Neue Kategorie hinzufügen
export const POST = async (req: Request) => {
  try {
    const { name }: { name: string } = await req.json();

    const result = await pool.query<{ id: number; name: string }[]>(
      "INSERT INTO categories (name) VALUES ($1) RETURNING id, name",
      [name]
    );

    // result[0] enthält das zurückgegebene Array
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error adding category:", error);
    return NextResponse.json({ error: "Error adding category" }, { status: 500 });
  }
};
