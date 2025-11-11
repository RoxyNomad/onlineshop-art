// Interface for representing an artwork
export interface Artwork {
  id: string;  // Unique identifier for the artwork
  artist_id: string;  // Reference to the artist of the artwork
  category_id: number | null;  // Reference to the category of the artwork
  name: string;  // Name of the artwork
  base_color: string;  // Base color of the artwork
  price: number;  // Price of the artwork
  created_at: string;  // Date and time when the artwork was created
  image_url: string;  // URL of the artwork's image
}

// Interface for representing a picture
export interface Picture {
  id: string;  // Unique identifier for the picture
  name: string;  // Name of the picture
  image_url: string;  // URL of the picture
}