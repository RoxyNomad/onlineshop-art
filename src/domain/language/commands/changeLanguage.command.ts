import i18n from "@/infrastructure/providers/i18nProvider"; // wir erstellen einen Core-i18n Provider

/**
 * Command: Change current language
 */
export async function changeLanguage(langCode: string) {
  if (!i18n.isInitialized) await i18n.init();
  await i18n.changeLanguage(langCode);
}
