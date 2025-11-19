import { useState, useMemo } from 'react';
import { ArtworksEntity } from '@/domain/artworks/entities/artworks.entity';

export const useSort = (initialArtworks: ArtworksEntity[]) => {
  const [selectedOption, setSelectedOption] = useState<string>('Neueste');
  const sortOptions = ["Neueste", "Älteste", "Preis ↑", "Preis ↓", "Name ↑", "Name ↓"];

  const artworks = useMemo(() => {
    const sorted = [...initialArtworks];

    switch (selectedOption) {
      case "Neueste":
        return sorted.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
      case "Älteste":
        return sorted.sort((a, b) => a.created_at.getTime() - b.created_at.getTime());
      case "Preis ↑":
        return sorted.sort((a, b) => a.price - b.price);
      case "Preis ↓":
        return sorted.sort((a, b) => b.price - a.price);
      case "Name ↑":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "Name ↓":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  }, [selectedOption, initialArtworks]);

  const handleSortChange = (option: string) => {
    setSelectedOption(option);
  };

  return { artworks, selectedOption, sortOptions, handleSortChange };
};
