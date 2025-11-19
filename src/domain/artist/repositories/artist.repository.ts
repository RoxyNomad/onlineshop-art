import { Artist } from "@/domain/artist/entities/artist.entity";

export interface ArtistRepository {
  findAll(): Promise<Artist[]>;
  findById(id: string): Promise<Artist | null>;
  // Optional weitere Domain-spezifische Methoden:
  // findByPortfolioUrl(url: string): Promise<Artist | null>;
}
