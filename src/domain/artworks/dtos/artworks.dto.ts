export interface CreateArtworkDTO {
  artistId: number;
  categoryId: string;
  name: string;
  baseColor: string;
  price: number;
  imageUrl: string;
}

export interface UpdateArtworkDTO {
  id: string;
  name?: string;
  baseColor?: string;
  price?: number;
  imageUrl?: string;
  categoryId?: string;
}

export interface FilterArtworkDTO {
  categoryId?: string;
  baseColor?: string;
  minPrice?: number;
  maxPrice?: number;
  artistId?: number;
  sortBy?: string;
}
