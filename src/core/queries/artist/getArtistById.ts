// src/core/queries/artist/getArtistById.ts
import { query } from "@/lib/db";
import { ArtistInfo } from "@/server/shared/types/artist.types";

/**
 * Fetch artist by ID from the database
 * @param artistId - Artist's ID
 * @returns ArtistInfo object or null if not found
 */
export const getArtistById = async (artistId: string): Promise<ArtistInfo | null> => {
  const results = await query<ArtistInfo>(
    `SELECT id, artist_name, bio, portfolio_url, profile_image_url, cover_image_url
     FROM artists
     WHERE id = $1`,
    [artistId]
  );

  return results[0] ?? null;
};
