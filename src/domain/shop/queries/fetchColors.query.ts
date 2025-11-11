import { Color, formatColorName } from "@/domain/shop/entities/filter.entity";

export async function fetchColors(): Promise<Color[]> {
  try {
    const res = await fetch("/api/colors");
    if (!res.ok) throw new Error("Failed to fetch colors");
    const data: string[] = await res.json();
    return data.map((name) => ({ name: formatColorName(name) }));
  } catch (err) {
    console.error("Error in fetchColors query:", err);
    return [];
  }
}
