import { IArtworkRepository } from "../repositories/artwork.repository";
import { Artwork } from "../entities/artwork.entity";

export class GetAllArtworksQuery {
  constructor(private readonly repo: IArtworkRepository) {}

  async execute(): Promise<Artwork[]> {
    return await this.repo.getAllArtworks();
  }
}
