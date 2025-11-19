import { ArtworksEntity } from "@/domain/artworks/entities/artworks.entity";

/**
 * Map DB/Prisma row to domain PhotoEntity.
 * Adjust field names if your Prisma model uses different names.
 */
export const artworksMapper = {
  toDomain: (raw: any): ArtworksEntity => {
    return new ArtworksEntity(
      String(raw.id),
      raw.name,
      raw.imageUrl ?? raw.image_url ?? "", // supports both prisma and older fields
      Number(raw.price),
      raw.baseColor ?? raw.base_color ?? "",
      String(raw.categoryId ?? raw.category_id ?? ""),
      raw.createdAt ? new Date(raw.createdAt) : new Date(raw.created_at)
    );
  },
};