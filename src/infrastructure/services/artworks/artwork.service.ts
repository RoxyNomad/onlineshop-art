import prisma from "@/infrastructure/providers/db/db";


export class ArtworkService {
  async getArtworks() {
    return prisma.artwork.findMany({
      include: {
        artist: true,
        category: true
      }
    });
  }

  async getArtworksByArtist(artistId: number) {
    return prisma.artwork.findMany({
      where: { artistId },
      include: { category: true }
    });
  }

  async createArtwork(data: {
    artistId: number;
    categoryId: string;
    name: string;
    baseColor: string;
    price: number;
    imageUrl: string;
  }) {
    return prisma.artwork.create({ data });
  }
}