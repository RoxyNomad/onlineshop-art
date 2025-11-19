import { Category, formatCategoryName } from "@/domain/artworks/entities/filter.entity";

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch("/api/categories");
    if (!res.ok) throw new Error("Failed to fetch categories");

    const data = (await res.json()) as { id: string; name: string }[];

    return data.map((cat) => ({
      id: cat.id,
      name: formatCategoryName(cat.name),
    }));
  } catch (err) {
    console.error("Error in fetchCategories query:", err);
    return [];
  }
}