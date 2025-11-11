import { UploadArtworkDTO } from "@/domain/artworks/dtos/artwork.dto";
import { Artwork } from "@/domain/artworks/entities/artwork.entity";
import { ArtworkRepository } from "@/infrastructure/repositories/artwork.repository";

/**
 * Command to upload a new artwork for a given artist.
 * Commands change application state.
 */
export async function uploadArtworkCommand(data: UploadArtworkDTO): Promise<Artwork> {
  const repository = new ArtworkRepository();
  return await repository.uploadArtwork(data);
}
