// Language entity
export interface Language {
  code: string;
  label: string;
}

// Domain logic: format language label if needed
export function formatLanguageLabel(label: string): string {
  return label.charAt(0).toUpperCase() + label.slice(1);
}
