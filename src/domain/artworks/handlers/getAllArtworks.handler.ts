import { GetAllArtworksQuery } from "../queries/getAllArtworks.query";
import { ArtworksRepository } from "@/domain/artworks/repositories/artworks.repository";
import { ArtworksEntity } from "@/domain/artworks/entities/artworks.entity";

export class GetAllArtworksHandler {
  constructor(private readonly repo: ArtworksRepository) {}

  async execute(_q: GetAllArtworksQuery): Promise<ArtworksEntity[]> {
    return await this.repo.findAll();
  }
}