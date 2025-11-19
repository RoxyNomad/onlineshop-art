import prisma from "@/infrastructure/providers/db/db";
import { FilterArtworkDTO } from "../dtos/artworks.dto";
import { ArtworksEntity } from "../entities/artworks.entity";

export async function fetchArtworks(filters: FilterArtworkDTO, sortBy: string = "Neueste"): Promise<ArtworksEntity[]> {
  const where: any = {};

  if (filters.categoryId) where.categoryId = filters.categoryId;
  if (filters.baseColor) where.baseColor = filters.baseColor;
  if (filters.artistId) where.artistId = filters.artistId;
  if (filters.minPrice || filters.maxPrice) {
    where.price = {};
    if (filters.minPrice !== undefined) where.price.gte = filters.minPrice;
    if (filters.maxPrice !== undefined) where.price.lte = filters.maxPrice;
  }

  const orderBy: any = (() => {
    switch (sortBy) {
      case "Neueste":
        return { createdAt: "desc" };
      case "Älteste":
        return { createdAt: "asc" };
      case "Preis ↑":
        return { price: "asc" };
      case "Preis ↓":
        return { price: "desc" };
      default:
        return { createdAt: "desc" };
    }
  })();

  const rows = await prisma.artwork.findMany({
    where,
    include: { category: true, artist: true },
    orderBy,
  });

  return rows.map(
    r =>
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
