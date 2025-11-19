import { ArtworksEntity } from "@/domain/artworks/entities/artworks.entity";

export interface ArtworksRepository {
  findAll(): Promise<ArtworksEntity[]>;
  findByCategory(categoryId: string): Promise<ArtworksEntity[]>;
}