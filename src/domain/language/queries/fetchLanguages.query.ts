import { Language, formatLanguageLabel } from "@/domain/language/entities/language.entity";

/**
 * Query: Fetch all supported languages
 * Returns an array of Language objects
 */
export async function fetchLanguages(): Promise<Language[]> {
  // Optional: kann auch aus einem API-Endpunkt geladen werden
  const languages = [
    { code: "de", label: "Deutsch" },
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "it", label: "Italiano" },
  ];

  return languages.map(lang => ({ ...lang, label: formatLanguageLabel(lang.label) }));
}
