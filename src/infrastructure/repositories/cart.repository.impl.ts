import { IArtworkRepository } from "@/domain/artworks/repositories/artworks.repository";
import { Artwork } from "@/domain/artworks/entities/artworks.entity";
import { pool } from "@/infrastructure/providers/db/db";

export class ArtworkRepository implements IArtworkRepository {
  async getAllArtworks(): Promise<Artwork[]> {
    const { data, error } = await pool
      .from("artworks")
      .select("id, name, price, image_url, artist_id, category_id");

    if (error) throw error;
    return data.map(a => new Artwork(a.id, a.name, a.price, a.image_url, a.artist_id, a.category_id));
  }
}
