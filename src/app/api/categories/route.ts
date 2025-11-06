import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

// DTO / Type für Category
interface Category {
  id: number;
  name: string;
}

// GET: Alle Kategorien holen
export const GET = async () => {
  try {
    // query ausführen, Typ angeben
    const result = await pool.query<Category[]>(
      "SELECT id, name FROM categories ORDER BY name ASC"
    );

    // result.rows existiert nicht direkt bei Neon, daher casten
    return NextResponse.json(result as unknown as Category[]);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Error fetching categories" }, { status: 500 });
  }
};

// POST: Neue Kategorie hinzufügen
export const POST = async (req: Request) => {
  try {
    const { name }: { name: string } = await req.json();

    const result = await pool.query<Category[]>(
      "INSERT INTO categories (name) VALUES ($1) RETURNING id, name",
      [name]
    );

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error adding category:", error);
    return NextResponse.json({ error: "Error adding category" }, { status: 500 });
  }
};