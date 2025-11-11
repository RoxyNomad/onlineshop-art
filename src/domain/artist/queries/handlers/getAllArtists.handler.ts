import { query } from '@/lib/db';
import { ArtistRepository } from '@/src/domain/artist/repositories/artist.repository';
import { GetAllArtistsQuery } from '../getAllArtists.query';
import { Artist } from '@/src/domain/artist/entities/artist.entity';

export class GetAllArtistsHandler {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async execute(_query: GetAllArtistsQuery): Promise<Artist[]> {
    return await this.artistRepository.findAll();
  }
}