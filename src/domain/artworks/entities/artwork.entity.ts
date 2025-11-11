export interface Artwork {
  id?: string;
  name: string;
  baseColor: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  artistId: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
}

export interface Props {
  onUpload: (url: string) => void;
  artistId?: string;
}

// Optional: Value Object für Name/Color etc.
export function formatCategoryName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function formatColorName(color: string): string {
  return color.charAt(0).toUpperCase() + color.slice(1);
}

export class Artwork {
  constructor(
    public readonly id: string,
    public name: string,
    public price: number,
    public imageUrl: string,
    public artistId: string,
    public categoryId: string
  ) {}
}