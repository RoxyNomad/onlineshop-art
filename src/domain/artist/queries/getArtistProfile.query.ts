import { AuthRepository } from "@/infrastructure/repositories/auth.repository";
import { ArtistProfile } from "@/domain/artist/entities/artistProfile.entity";

export class GetArtistProfileQuery {
  constructor(private readonly repo: AuthRepository, private readonly artistId: string) {}

  async execute(): Promise<ArtistProfile | null> {
    const user = await this.repo.findById(this.artistId);
    if (!user) return null;

    // Optional: hier könntest du noch weitere Artist-spezifische Daten holen
    return new ArtistProfile(
      user.id,
      user.name,
      user.email,
      user.userType,
      (user as any)?.artistName,
      (user as any)?.portfolioUrl
    );
  }
}