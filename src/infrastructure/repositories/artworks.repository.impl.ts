import prisma from "@/infrastructure/providers/db/db";
import { ArtworksRepository } from "@/domain/artworks/repositories/artworks.repository";
import { ArtworksEntity } from "@/domain/artworks/entities/artworks.entity";
import { artworksMapper } from "./mappers/artworks.mapper";

/**
 * Prisma implementation of PhotographyRepository.
 * Uses your existing db.ts (PrismaClient singleton).
 */
export class ArtworksRepositoryImpl implements ArtworksRepository {
  async findAll(): Promise<ArtworksEntity[]> {
    const rows = await prisma.artwork.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        price: true,
        baseColor: true,
        categoryId: true,
        createdAt: true,
      },
    });

    return rows.map((r) => artworksMapper.toDomain(r));
  }

  async findByCategory(categoryId: string): Promise<ArtworksEntity[]> {
    const rows = await prisma.artwork.findMany({
      where: { categoryId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        price: true,
        baseColor: true,
        categoryId: true,
        createdAt: true,
      },
    });

    return rows.map((r) => artworksMapper.toDomain(r));
  }
}