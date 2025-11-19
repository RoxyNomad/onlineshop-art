import { FilterArtworkDTO } from "@/domain/artworks/dtos/artworks.dto";

export function mapSearchParamsToFilterDTO(params: URLSearchParams, defaultCategory?: string): FilterArtworkDTO {
  return {
    categoryId: params.get("category") || defaultCategory,
    baseColor: params.get("color") || undefined,
    minPrice: params.get("minPrice") ? Number(params.get("minPrice")) : undefined,
    maxPrice: params.get("maxPrice") ? Number(params.get("maxPrice")) : undefined,
    artistId: params.get("artist") ? Number(params.get("artist")) : undefined,
  };
}

export function updateUrlParam(key: string, value: string | number | undefined) {
  const params = new URLSearchParams(window.location.search);
  if (!value) params.delete(key);
  else params.set(key, String(value));
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, "", newUrl);
}
