import prisma from "@/infrastructure/providers/db/db";
import { FilterArtworkDTO } from "@/domain/artworks/dtos/artworks.dto";
import { ArtworksEntity } from "@/domain/artworks/entities/artworks.entity";

export class ArtworkFilterService {
  async filterArtworks(filters: FilterArtworkDTO): Promise<ArtworksEntity[]> {
    const where: any = {};

    if (filters.categoryId) where.categoryId = filters.categoryId;
    if (filters.baseColor) where.baseColor = filters.baseColor;
    if (filters.artistId) where.artistId = filters.artistId;

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      where.price = {};
      if (filters.minPrice !== undefined) where.price.gte = filters.minPrice;
      if (filters.maxPrice !== undefined) where.price.lte = filters.maxPrice;
    }

    const rows = await prisma.artwork.findMany({
      where,
      include: { category: true, artist: true },
      orderBy: { createdAt: "desc" }, // Standard sort
    });

    return rows.map(
      (r) =>
        new ArtworksEntity(
          String(r.id),
          r.name,
          r.imageUrl,
          r.price,
          r.baseColor,
          String(r.categoryId),
          r.createdAt
        )
    );
  }
}
