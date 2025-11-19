import { fetchArtworks } from "../queries/fetchArtworks.query";
import { FilterArtworkDTO } from "../dtos/artworks.dto";
import { ArtworksEntity } from "../entities/artworks.entity";

export async function getFilteredArtworks(filters: FilterArtworkDTO, sortBy: string = "Neueste"): Promise<ArtworksEntity[]> {
  return fetchArtworks(filters, sortBy);
}
