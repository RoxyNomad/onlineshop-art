import prisma from "@/infrastructure/providers/db/db";

export class ColorService {
  async getAllColors() {
    const artworks = await prisma.artwork.findMany({
      select: { baseColor: true }
    });

    return [...new Set(artworks.map(a => a.baseColor))];
  }
}