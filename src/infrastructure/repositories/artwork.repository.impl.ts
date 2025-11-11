import { IArtworkRepository } from "@/domain/artworks/repositories/artwork.repository";
import { Artwork } from "@/domain/artworks/entities/artwork.entity";
import { pool } from "@/lib/db";

export class ArtworkRepository implements IArtworkRepository {
  async getAllArtworks(): Promise<Artwork[]> {
    const { data, error } = await pool
      .from("artworks")
      .select("id, name, price, image_url, artist_id, category_id");

    if (error) throw error;
    return data.map(a => new Artwork(a.id, a.name, a.price, a.image_url, a.artist_id, a.category_id));
  }
}
