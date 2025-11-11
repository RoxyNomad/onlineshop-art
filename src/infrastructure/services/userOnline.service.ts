// src/server/services/userOnline.service.ts
import { pool } from "@/lib/db";

export interface UserOnline {
    id: string;
    email: string;
}

export async function getUser(userId: string): Promise<UserOnline | null> {
    try {
        const result = await pool.query<UserOnline>(
            "SELECT id, email FROM users WHERE id = $1",
            [userId]
        );

        if (result.length === 0) {
            return null; // User existiert nicht
        }

        return result[0]; // User gefunden
    } catch (error) {
        console.error("Fehler beim Abrufen des Benutzers:", error);
        return null;
    }
}
