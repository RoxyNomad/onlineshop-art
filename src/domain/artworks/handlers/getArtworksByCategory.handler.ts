import { GetArtworksByCategoryQuery } from "../queries/getArtworksByCategory.query";
import { ArtworksRepository } from "@/domain/artworks/repositories/artworks.repository";
import { ArtworksEntity } from "@/domain/artworks/entities/artworks.entity";

export class GetArtworksByCategoryHandler {
  constructor(private readonly repo: ArtworksRepository) {}

  async execute(q: GetArtworksByCategoryQuery): Promise<ArtworksEntity[]> {
    return await this.repo.findByCategory(q.categoryId);
  }
}