import { query } from "@/lib/db";
import { Artwork } from "@/server/shared/types/artwork.types";

interface UploadArtworkCommand {
  artistId: string;
  name: string;
  baseColor: string;
  price: number;
  categoryId?: number;
  imageUrl: string;
}

export const uploadArtwork = async (command: UploadArtworkCommand): Promise<Artwork> => {
  const result = await query<Artwork>(
    `INSERT INTO artworks (artist_id, name, base_color, price, category_id, image_url, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, NOW())
     RETURNING *`,
    [
      command.artistId,
      command.name,
      command.baseColor,
      command.price,
      command.categoryId ?? null,
      command.imageUrl,
    ]
  );

  return result[0]; // one row only
};
