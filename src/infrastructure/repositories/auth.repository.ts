import { pool } from "@/lib/db";
import { User } from "@/domain/auth/entities/user.entity";
import { Artist } from "@/domain/auth/entities/artist.entity";

export class AuthRepository {
    // Find user by email
    async findByEmail(email: string): Promise<User | null> {
        const results = await pool.query<User>(
            "SELECT id, name, email, user_type FROM users WHERE email = $1",
            [email]
        );
        if (results.length === 0) return null;
        const { id, name, userType } = results[0];
        return new User(id, name, email, userType);
    }

    // Get password hash for a given email
    async getPasswordHash(email: string): Promise<string | null> {
        const results = await pool.query<{ password_hash: string }>(
            "SELECT password_hash FROM users WHERE email = $1",
            [email]
        );
        return results[0]?.password_hash ?? null;
    }

    // Create a new user
    async createUser(user: User, passwordHash: string): Promise<User> {
        const results = await pool.query<User>(
            "INSERT INTO users (name, email, password_hash, user_type) VALUES ($1, $2, $3, $4) RETURNING id, name, email, user_type",
            [user.name, user.email, passwordHash, user.userType]
        );
        const row = results[0];
        return new User(row.id, row.name, row.email, row.userType);
    }

    // Create an artist
    async createArtist(artist: Artist): Promise<Artist> {
        await pool.query(
            "INSERT INTO artists (id, artist_name, portfolio_url) VALUES ($1, $2, $3)",
            [artist.id, artist.artistName || null, artist.portfolioUrl || null]
        );
        return artist;
    }

    // Find user by ID
    async findById(id: string): Promise<User | null> {
        const results = await pool.query<User>(
            "SELECT id, name, email, user_type FROM users WHERE id = $1",
            [id]
        );
        if (results.length === 0) return null;
        const { name, email, userType } = results[0];
        return new User(id, name, email, userType);
    }
}
