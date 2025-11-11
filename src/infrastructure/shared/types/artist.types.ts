// Interface for representing an artist
export interface Artist {
  id: number;  // Unique identifier for the artist
  artist_name: string;  // Name of the artist
  bio: string;  // Biography of the artist
  portfolio_url: string;  // URL of the artist's portfolio
  profile_image_url: string | null;  // URL of the artist's profile image (can be null)
  cover_image_url: string | null;  // URL of the artist's cover image (can be null)
  artworks: string;
}

// Interface for representing artist information with optional profile and cover images
export interface ArtistInfo {
  artist_name: string;  // Name of the artist
  bio: string;  // Biography of the artist
  portfolio_url: string;  // URL of the artist's portfolio
  profile_image_url?: string | null;  // Optional profile image URL
  cover_image_url?: string | null;  // Optional cover image URL
}