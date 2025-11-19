import { ArtistRepository } from '@/domain/artist/repositories/artist.repository';
import { Artist } from '@/domain/artist/entities/artist.entity';
import { artistMapper } from '@/infrastructure/repositories/mappers/artist.mapper';
import { query } from '@/infrastructure/providers/db/db';

/**
 * Server-side repository implementation using Prisma (via query wrapper).
 * This file must remain on the server (used by API route / handlers).
 */
export class ArtistRepositoryImpl implements ArtistRepository {
  async findAll(): Promise<Artist[]> {
    return query(async (prisma) => {
      // Optionally add ordering or select fields
      const results = await prisma.artist.findMany({
        orderBy: { artistName: 'asc' },
      });
      return results.map(artistMapper.toDomain);
    });
  }

  async findById(id: string): Promise<Artist | null> {
    return query(async (prisma) => {
      // Prisma Artist.id is Int in your schema (so convert)
      const result = await prisma.artist.findUnique({ where: { id: Number(id) } });
      return result ? artistMapper.toDomain(result) : null;
    });
  }
}