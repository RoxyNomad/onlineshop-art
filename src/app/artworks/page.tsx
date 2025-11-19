'use client';

import { useEffect, useState } from 'react';
import { useSort } from '@/ui/hooks/useSort';
import { ArtworksEntity } from '@/domain/artworks/entities/artworks.entity';
import { ArtworkFilterService } from '@/infrastructure/services/artworks/artworkFilter.service';
import Image from 'next/image';
import styles from '@/ui/styles/modules/artworks/artworks.module.scss';
import SelectionBarArtworks from '@/ui/shop/SelectionBarArtworks';

export default function ArtworksPage() {
  const [artworks, setArtworks] = useState<ArtworksEntity[]>([]);
  const { artworks: sortedArtworks, handleSortChange, selectedOption, sortOptions } = useSort(artworks);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filterService = new ArtworkFilterService();

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  useEffect(() => {
    (async () => {
      const filtered = await filterService.filterArtworks({
        categoryId: selectedCategory || undefined,
        baseColor: selectedColor || undefined,
      });
      setArtworks(filtered);
    })();
  }, [selectedColor, selectedCategory]);

  return (
    <div>
      <SelectionBarArtworks
        handleSortChange={handleSortChange}
        handleColorChange={setSelectedColor}
        handleCategoryChange={handleCategoryChange}
        selectedOption={selectedOption}
        sortOptions={sortOptions}
        pictures={sortedArtworks}
      />

      <section>
        <div className={styles.pictureContainer}>
          {sortedArtworks.length > 0 ? (
            sortedArtworks.map((artwork) => (
              <div key={artwork.id} className={styles.pictureField}>
                <Image
                  className={styles.picture}
                  src={artwork.image_url}
                  alt={artwork.name}
                  width={200}
                  height={150}
                />
                <p className={styles.pictureLabel}>
                  {artwork.name} – {artwork.price} CHF – {artwork.artistName}
                </p>
              </div>
            ))
          ) : (
            <p className={styles.noResults}>Keine Bilder gefunden</p>
          )}
        </div>
      </section>
    </div>
  );
}
