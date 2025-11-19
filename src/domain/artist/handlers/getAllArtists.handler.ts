import { ArtistRepository } from "@/domain/artist/repositories/artist.repository";
import { GetAllArtistsQuery } from "../queries/getAllArtist.query";
import { Artist } from "@/domain/artist/entities/artist.entity";

export class GetAllArtistsHandler {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async execute(_query: GetAllArtistsQuery): Promise<Artist[]> {
    return this.artistRepository.findAll();
  }
}