import { ArtistService } from "@/infrastructure/services/artworks/artist.service";
import { UpdateArtistProfileDTO } from "@/domain/artist/dtos/artist.dto";

/**
 * Command Layer – updates artist profile via service
 */
export async function updateArtistProfileCommand(data: UpdateArtistProfileDTO) {
  return await ArtistService.updateArtistProfile(data);
}
