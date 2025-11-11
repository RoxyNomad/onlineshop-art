import type { Artwork } from "@/domain/artworks/entities/artwork.entity";

export async function createArtwork(artwork: Artwork): Promise<void> {
  try {
    const res = await fetch("/api/artworks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(artwork),
    });
    if (!res.ok) throw new Error("Failed to create artwork");
  } catch (err) {
    console.error("Error creating artwork:", err);
    throw err;
  }
}

export async function createCategory(name: string): Promise<{ id: string; name: string }> {
  try {
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) throw new Error("Failed to create category");
    return res.json();
  } catch (err) {
    console.error("Error creating category:", err);
    throw err;
  }
}
