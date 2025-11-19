import { useState, useMemo } from "react";
import { NoveltiesEntity } from "@/domain/novelties/entities/novelties.entity";

export const useNoveltiesSort = (initialNovelties: NoveltiesEntity[]) => {
  const [selectedOption, setSelectedOption] = useState<string>("Neueste");

  // Nur eine Sortieroption nötig, aber wir lassen Dropdown erweiterbar
  const sortOptions = ["Neueste", "Älteste"];

  const novelties = useMemo(() => {
    const sorted = [...initialNovelties];
    switch (selectedOption) {
      case "Neueste":
        return sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      case "Älteste":
        return sorted.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      default:
        return sorted;
    }
  }, [selectedOption, initialNovelties]);

  const handleSortChange = (option: string) => setSelectedOption(option);

  return { novelties, selectedOption, sortOptions, handleSortChange };
};
