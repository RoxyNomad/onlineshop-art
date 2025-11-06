// src/core/commands/artist/updateArtistProfile.ts
import { query } from "@/lib/db";
import { ArtistInfo } from "@/server/shared/types/artist.types";

export interface UpdateArtistPayload {
  artist_name?: string;
  bio?: string;
  portfolio_url?: string;
  profile_image_url?: string | null;
  cover_image_url?: string | null;
}

/**
 * Update an artist's profile in the database
 * @param artistId - Artist's ID
 * @param updates - Fields to update
 * @returns Updated ArtistInfo object
 */
export const updateArtistProfile = async (
  artistId: string,
  updates: UpdateArtistPayload
): Promise<ArtistInfo> => {
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  if (fields.length === 0) {
    throw new Error("No fields provided for update");
  }

  const setString = fields.map((f, i) => `${f} = $${i + 1}`).join(", ");

  const results = await query<ArtistInfo>(
    `UPDATE artists SET ${setString} WHERE id = $${fields.length + 1} RETURNING *`,
    [...values, artistId]
  );

  return results[0];
};
