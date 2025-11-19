import { Artist } from "@/domain/novelties/entities/filter.entity";

export async function fetchArtists(): Promise<Artist[]> {
  try {
    const res = await fetch("/api/artists");
    if (!res.ok) throw new Error("Failed to fetch artists");
    const data: { id: string; name: string }[] = await res.json();
    return data.map((a) => ({ id: a.id, name: a.name }));
  } catch (err) {
    console.error("Error fetching artists:", err);
    return [];
  }
}
