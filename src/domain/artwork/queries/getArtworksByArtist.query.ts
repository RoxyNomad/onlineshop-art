import { Artwork } from "@/domain/artworks/entities/artworks.entity";
import { ArtworkRepository } from "@/infrastructure/repositories/artwork.repository";

/**
 * Query to retrieve artworks created by a specific artist.
 * Queries do NOT change state — they only read data.
 */
export async function getArtworksByArtistQuery(artistId: string): Promise<Artwork[]> {
  const repository = new ArtworkRepository();
  return await repository.findByArtistId(artistId);
}
