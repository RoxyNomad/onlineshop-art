// src/server/services/(auth).service.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "@/lib/db";

// JWT Secret aus Environment
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Interfaces
export interface User {
    id: string;
    name: string;
    email: string;
    user_type: "customer" | "artist";
}

export interface Artist {
    id: string;
    artist_name?: string;
    portfolio_url?: string;
}

// 🔹 Register a new user
export async function registerUser(
    email: string,
    password: string,
    name: string,
    userType: "customer" | "artist",
    artistName?: string,
    portfolioUrl?: string
): Promise<{ user: User | null; error: string | null }> {
    try {
        const { rows: existing } = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );
        if (existing.length > 0) {
            return { user: null, error: "Ein Benutzer mit dieser E-Mail existiert bereits." };
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const result = await pool.query<User>(
            "INSERT INTO users (name, email, password_hash, user_type) VALUES ($1, $2, $3, $4) RETURNING id, name, email, user_type",
            [name, email, passwordHash, userType]
        );

        const newUser = result.rows[0];

        if (userType === "artist") {
            await pool.query(
                "INSERT INTO artists (id, artist_name, portfolio_url) VALUES ($1, $2, $3)",
                [newUser.id, artistName || null, portfolioUrl || null]
            );
        }

        return { user: newUser, error: null };
    } catch (err: any) {
        return { user: null, error: `Fehler bei der Registrierung: ${err.message}` };
    }
}

// 🔹 Login user
export async function loginUser(
    email: string,
    password: string
): Promise<{ token?: string; error?: string }> {
    try {
        const { rows } = await pool.query<{ id: string; password_hash: string }>(
            "SELECT id, password_hash FROM users WHERE email = $1",
            [email]
        );

        if (rows.length === 0) return { error: "Benutzer nicht gefunden." };

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) return { error: "Falsches Passwort." };

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
        return { token };
    } catch (err: any) {
        return { error: `Fehler beim Login: ${err.message}` };
    }
}

// 🔹 Get user from token
export async function getUserFromToken(token: string): Promise<User | null> {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        const { rows } = await pool.query<User>(
            "SELECT id, name, email, user_type FROM users WHERE id = $1",
            [decoded.userId]
        );
        return rows[0] || null;
    } catch (err) {
        console.error("Ungültiger Token:", err);
        return null;
    }
}

// 🔹 Logout user
export async function logoutUser(): Promise<void> {
    // Bei JWT-basiertem Auth gibt es serverseitig keinen Logout
    // Token im Frontend löschen
    return;
}
