import { Artwork } from "../entities/artwork.entity";

export interface IArtworkRepository {
  getAllArtworks(): Promise<Artwork[]>;
}
