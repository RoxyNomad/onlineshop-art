import { useState, useMemo } from 'react';
import { Artwork } from '@/domain/artworks/entities/artwork.entity';

// Custom React hook for sorting artworks in the frontend UI
export const useSort = (initialArtworks: Artwork[]) => {
  // State for currently selected sorting option
  const [selectedOption, setSelectedOption] = useState<string>('Neueste');

  // List of available sorting options for the dropdown
  const sortOptions = ['Neueste', 'Preis aufsteigend', 'Preis absteigend'];

  // Memoized sorted list (recomputes only when dependencies change)
  const sortedArtworks = useMemo(() => {
    const sorted = [...initialArtworks]; // Copy array to avoid mutating state

    switch (selectedOption) {
      case 'Neueste':
        // Sort by creation date (newest first)
        return sorted.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case 'Preis aufsteigend':
        // Sort by ascending price
        return sorted.sort((a, b) => a.price - b.price);
      case 'Preis absteigend':
        // Sort by descending price
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  }, [selectedOption, initialArtworks]);

  // Handler for updating the sort option
  const handleSortChange = (option: string) => {
    setSelectedOption(option);
  };

  // Return state and helpers for UI use
  return { selectedOption, sortOptions, artworks: sortedArtworks, handleSortChange };
};
