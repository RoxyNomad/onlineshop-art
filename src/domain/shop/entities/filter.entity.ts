export interface Color {
  name: string;
}

export function formatColorName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export interface Category {
  id: string;
  name: string;
}

export function formatCategoryName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}