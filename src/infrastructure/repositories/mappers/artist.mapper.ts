import { Artist } from '@/domain/artist/entities/artist.entity';

/**
 * Map raw DB/Prisma Artist object -> Domain Artist entity.
 * Prisma schema uses camelCase (artistName, profileImageUrl...), but your domain entity
 * currently expects snake_case properties like artist_name. The mapper performs the conversion.
 */
export const artistMapper = {
  toDomain: (raw: any): Artist => {
    // Convert id to string to keep the domain entity id string-based
    const id = raw.id !== undefined && raw.id !== null ? String(raw.id) : '';

    return new Artist(
      id,
      // Domain field names (artist_name etc.) — keep domain shapes stable
      raw.artistName ?? raw.artist_name ?? '',
      raw.bio ?? '',
      raw.portfolioUrl ?? raw.portfolio_url ?? '',
      raw.profileImageUrl ?? raw.profile_image_url ?? null,
      raw.coverImageUrl ?? raw.cover_image_url ?? null
    );
  },
};