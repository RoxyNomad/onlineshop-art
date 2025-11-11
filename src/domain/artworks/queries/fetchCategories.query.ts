import { Category, formatCategoryName } from "@/domain/shop/entities/filter.entity";

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch("/api/categories");
    if (!res.ok) throw new Error("Failed to fetch categories");

    const data: { id: string; name: string }[] = await res.json();
    return data.map((cat) => ({ 
      id: cat.id.toString(), 
      name: formatCategoryName(cat.name) 
    }));
    
  } catch (err) {
    console.error("Error in fetchCategories query:", err);
    return [];
  }
}