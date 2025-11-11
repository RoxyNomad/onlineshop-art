export class ArtistProfile {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly userType: "artist" | "customer",
    public readonly artistName?: string,
    public readonly portfolioUrl?: string
  ) {}


  // Du könntest hier auch Domain-Methoden hinzufügen, z.B.
  // updatePortfolioUrl(newUrl: string) { this.portfolioUrl = newUrl; }
  // updateBio(newBio: string) { this.bio = newBio; }
}