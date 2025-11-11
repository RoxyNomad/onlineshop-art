"use client";

import { useState, useEffect } from "react";
import { fetchLanguages } from "@/domain/language/queries/fetchLanguages.query";
import { changeLanguage } from "@/domain/language/commands/changeLanguage.command";
import type { Language } from "@/domain/language/entities/language.entity";

export default function LanguageSwitcher() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [activeLang, setActiveLang] = useState("de");

  useEffect(() => {
    const loadLanguages = async () => {
      const langs = await fetchLanguages();
      setLanguages(langs);
      setActiveLang(langs[0]?.code || "de");
    };
    loadLanguages();
  }, []);

  const handleLanguageChange = async (code: string) => {
    await changeLanguage(code);
    setActiveLang(code);
  };

  return (
    <div className="flex gap-2 items-center">
      {languages.map(lang => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`px-3 py-1 rounded-md border transition-colors duration-200 ${
            activeLang === lang.code
              ? "bg-amber-400 text-black border-amber-500"
              : "bg-transparent text-gray-600 hover:bg-gray-100"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
