import type { ArtworksEntity } from "@/domain/artworks/entities/artworks.entity";

export interface SelectionBarProps {
  handleSortChange: (option: string) => void;
  handleColorChange: (color: string) => void;
  handleCategoryChange?: (category: string) => void;
  handlePriceChange?: (min?: number, max?: number) => void;
  handleArtistChange?: (artistId: string) => void;
  selectedOption: string;
  sortOptions: string[];
  pictures?: ArtworksEntity[];
}

export interface SelectionBarNoveltiesProps {
  selectedOption: string;
  sortOptions: string[];
  handleSortChange: (opt: string) => void;
  handleArtistChange: (artistId: string) => void;
}
