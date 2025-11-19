import prisma from "@/infrastructure/providers/db/db";
import { UpdateArtistProfileDTO } from "@/domain/artist/dtos/artist.dto";

export const ArtistService = {
  async getArtistProfile(artistId: number) {
    return prisma.artist.findUnique({
      where: { id: artistId },
      include: {
        artworks: true,
        products: true,
      },
    });
  },

  async updateArtistProfile(data: UpdateArtistProfileDTO) {
    return prisma.artist.update({
      where: { id: data.artistId },
      data: {
        artistName: data.name,
        bio: data.bio,
        portfolioUrl: data.portfolioUrl,
        profileImageUrl: data.profileImageUrl,
        coverImageUrl: data.coverImageUrl,
      },
    });
  },
};
