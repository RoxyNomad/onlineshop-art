export interface Artist {
  id: string;
  name: string;
}

export function formatArtistName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}
