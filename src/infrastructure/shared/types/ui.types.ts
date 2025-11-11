import type { Artwork } from "./artwork.types";

// Interface for the props of the upload component
export interface Props {
  onUpload: (imageUrl: string) => void;  // Function to handle image upload
  artistId?: string;  // Optional artist ID
}

// Interface for the props of the selection bar component
export interface SelectionBarProps {
  handleSortChange: (option: string) => void;  // Function to handle sorting option change
  handleColorChange: (color: string) => void;  // Function to handle color change
  handleCategoryChange: (category: string) => void;  // Function to handle category change
  selectedOption: string;  // The currently selected sorting option
  sortOptions: string[];  // List of available sorting options
  pictures: Artwork[];  // List of artwork pictures
}
