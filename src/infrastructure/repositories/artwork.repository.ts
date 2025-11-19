import { pool } from "@/infrastructure/providers/db/db";
import { UploadArtworkDTO } from "@/domain/artworks/dtos/artworks.dto";
import { Artwork } from "@/domain/artworks/entities/artworks.entity";

export class ArtworkRepository {
  async findByArtistId(artistId: string): Promise<Artwork[]> {
    const result = await pool.query<Artwork>(
      "SELECT * FROM artworks WHERE artist_id = $1 ORDER BY created_at DESC",
      [artistId]
    );
    return result;
  }

  async uploadArtwork(data: UploadArtworkDTO): Promise<Artwork> {
    const result = await pool.query<Artwork>(
      `INSERT INTO artworks (artist_id, name, base_color, price, image_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [data.artistId, data.name, data.baseColor, data.price, data.imageUrl]
    );
    return result[0];
  }
}
