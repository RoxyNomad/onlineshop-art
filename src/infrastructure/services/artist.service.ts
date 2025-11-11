import { ArtistRepository } from "../repositories/artist.repository";
import { UpdateArtistProfileDTO } from "@/domain/artist/dtos/artist.dto";
import { Artist } from "@/domain/artist/entities/artist.entity";

export const ArtistService = {
  async getArtistProfile(artistId: string): Promise<Artist | null> {
    return await ArtistRepository.getById(artistId);
  },

  async updateArtistProfile(data: UpdateArtistProfileDTO): Promise<Artist> {
    return await ArtistRepository.updateProfile(data.artistId, {
      artist_name: data.name,
      bio: data.bio,
      portfolio_url: data.portfolioUrl,
      profile_image_url: data.profileImageUrl,
      cover_image_url: data.coverImageUrl,
    });
  },
};