// src/core/entities/artist.entity.ts

export interface Artist {
  id: string;
  artist_name: string;
  bio: string | null;
  portfolio_url: string | null;
  profile_image_url: string | null;
  cover_image_url: string | null;
  created_at?: Date;
  updated_at?: Date;
}

// src/domain/artist/entities/artist.entity.ts

export class Artist {
  constructor(
    public readonly id: string,
    public readonly artist_name: string,
    public readonly bio: string,
    public readonly portfolio_url: string,
    public readonly profile_image_url?: string,
    public readonly cover_image_url?: string
  ) {}
}
