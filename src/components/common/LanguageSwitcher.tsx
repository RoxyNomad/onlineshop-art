'use client';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';

/**
 * LanguageSwitcher component
 * Allows users to switch the application language dynamically.
 */
export default function LanguageSwitcher() {
    const { i18n } = useTranslation(); // Hook for accessing and changing the current language
    const [activeLang, setActiveLang] = useState(i18n.language); // Track which language is currently active

    // Change language handler
    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang); // Switch language in i18next
        setActiveLang(lang); // Update state to reflect the active language
    };

    const languages = [
        { code: 'de', label: 'Deutsch' },
        { code: 'en', label: 'English' },
        { code: 'fr', label: 'Français' },
        { code: 'it', label: 'Italiano' },
    ];

    return (
        <div className="flex gap-2 items-center">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`px-3 py-1 rounded-md border transition-colors duration-200 ${
                        activeLang === lang.code
                            ? 'bg-amber-400 text-black border-amber-500'
                            : 'bg-transparent text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    {lang.label}
                </button>
            ))}
        </div>
    );
}
