import { query } from "@/lib/db";
import { Artwork } from "@/server/shared/types/artwork.types";

export const getArtworksByArtist = async (artistId: string): Promise<Artwork[]> => {
  return await query<Artwork>(
    `SELECT id, name, base_color, price, image_url, category_id, artist_id, created_at
     FROM artworks
     WHERE artist_id = $1
     ORDER BY created_at DESC`,
    [artistId]
  );
};
