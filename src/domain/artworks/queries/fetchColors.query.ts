import { Color, formatColorName } from "@/domain/artworks/entities/filter.entity";

export async function fetchColors(): Promise<Color[]> {
  try {
    const res = await fetch("/api/colors");
    if (!res.ok) throw new Error("Failed to fetch colors");

    const data = (await res.json()) as { name: string }[];

    return data.map((c) => ({
      name: formatColorName(c.name),
    }));
  } catch (err) {
    console.error("Error in fetchColors query:", err);
    return [];
  }
}