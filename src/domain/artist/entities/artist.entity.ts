export class Artist {
  constructor(
    public readonly id: string,
    public readonly artist_name: string,
    public readonly bio: string,
    public readonly portfolio_url: string,
    public readonly profile_image_url?: string | null,
    public readonly cover_image_url?: string | null
  ) {}
}