import { Artist } from '@/src/domain/artist/entities/artist.entity';

export const artistMapper = {
  toDomain: (raw: any): Artist => {
    return new Artist(
      raw.id,
      raw.artist_name,
      raw.bio,
      raw.portfolio_url,
      raw.profile_image_url,
      raw.cover_image_url
    );
  },
};