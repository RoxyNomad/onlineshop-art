import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(HttpBackend) // Lädt Übersetzungen von /locales/{lang}/{ns}.json
    .use(LanguageDetector) // Erkennung der Sprache im Browser
    .use(initReactI18next) // Bindung an React
    .init({
        fallbackLng: 'de', // Standard-Sprache
        debug: false,
        supportedLngs: ['de', 'en', 'fr', 'it'],
        interpolation: {
            escapeValue: false, // React schützt vor XSS
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json', // Pfad zu Übersetzungen
        },
        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'navigator'],
            caches: ['cookie', 'localStorage'],
        },
    });

export default i18n;
