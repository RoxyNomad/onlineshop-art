import { query } from "@/lib/db";
import { Artist } from "@/domain/artist/entities/artist.entity";

export interface UpdateArtistPayload {
  artist_name?: string;
  bio?: string;
  portfolio_url?: string;
  profile_image_url?: string | null;
  cover_image_url?: string | null;
}

export const ArtistRepository = {
  async updateProfile(artistId: string, updates: UpdateArtistPayload): Promise<Artist> {
    const fields = Object.keys(updates);
    const values = Object.values(updates);

    if (fields.length === 0) {
      throw new Error("No fields provided for update");
    }

    const setString = fields.map((f, i) => `${f} = $${i + 1}`).join(", ");

    const results = await query<Artist>(
      `UPDATE artists SET ${setString}, updated_at = NOW() WHERE id = $${fields.length + 1} RETURNING *`,
      [...values, artistId]
    );

    return results[0];
  },

  async getById(artistId: string): Promise<Artist | null> {
    const results = await query<Artist>(`SELECT * FROM artists WHERE id = $1`, [artistId]);
    return results[0] ?? null;
  },
};