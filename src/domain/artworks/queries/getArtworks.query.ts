import { GetAllArtworksQuery } from "./getAllArtworks.query";
import { GetArtworksByCategoryQuery } from "./getArtworksByCategory.query";
import { GetAllArtworksHandler } from "../handlers/getAllArtworks.handler";
import { GetArtworksByCategoryHandler } from "../handlers/getArtworksByCategory.handler";
import { ArtworksRepositoryImpl } from "@/infrastructure/repositories/artworks.repository.impl";
import { ArtworksEntity } from "@/domain/artworks/entities/artworks.entity";

const repo = new ArtworksRepositoryImpl();

export async function getAllArtworksQuery(): Promise<ArtworksEntity[]> {
  const handler = new GetAllArtworksHandler(repo);
  const q = new GetAllArtworksQuery();
  return handler.execute(q);
}

export async function getArtworksByCategoryQuery(categoryId: string): Promise<ArtworksEntity[]> {
  const handler = new GetArtworksByCategoryHandler(repo);
  const q = new GetArtworksByCategoryQuery(categoryId);
  return handler.execute(q);
}
