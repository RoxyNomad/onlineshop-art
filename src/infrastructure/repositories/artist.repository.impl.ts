import { supabase } from '@/src/infrastructure/db/neonClient';
import { ArtistRepository } from '@/src/domain/artist/repositories/artist.repository';
import { Artist } from '@/src/domain/artist/entities/artist.entity';
import { artistMapper } from '@/src/infrastructure/db/mappers/artist.mapper';

export class ArtistRepositoryImpl implements ArtistRepository {
  async findAll(): Promise<Artist[]> {
    const { data, error } = await supabase
      .from('artists')
      .select('id, artist_name, bio, portfolio_url, profile_image_url, cover_image_url');

    if (error) {
      console.error('Error fetching artists:', error);
      throw new Error('Failed to fetch artists');
    }

    return data.map(artistMapper.toDomain);
  }
}