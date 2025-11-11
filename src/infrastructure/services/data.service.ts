// src/server/services/data.service.ts
import { pool } from "@/src/lib/db";
import { Artwork } from "@/src/server/services/types";

// 🔹 Fetch all artworks from the database
export const fetchArtworks = async (): Promise<Artwork[]> => {
    try {
        const result = await pool.query<Artwork>("SELECT * FROM artworks");
        return result.rows; // Alle Kunstwerke zurückgeben
    } catch (error) {
        console.error("Fehler beim Abrufen der Kunstwerke:", error);
        return [];
    }
};

// 🔹 Fetch artworks filtered by category
export const fetchArtworksByCategory = async (
    categoryId: string
): Promise<Artwork[]> => {
    try {
        const result = await pool.query<Artwork>(
            "SELECT * FROM artworks WHERE category_id = $1",
            [categoryId] // $1 ist Platzhalter
        );
        return result.rows;
    } catch (error) {
        console.error(
            `Fehler beim Abrufen der Kunstwerke für Kategorie ${categoryId}:`,
            error
        );
        return [];
    }
};
