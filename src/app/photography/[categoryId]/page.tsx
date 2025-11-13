'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSort } from '@/ui/hooks/useSort';
import { getPhotosByCategoryQuery } from '@/domain/photography/queries/getPhotos.query';
import { PhotoEntity } from '@/domain/photography/entities/photo.entity';
import SelectionBar from '@/ui/shop/SelectionBarPhotography';
import Image from 'next/image';
import styles from '@/styles/photography/photography.module.scss';

export default function PhotographyCategoryPage() {
  const { categoryId } = useParams();
  const [artworks, setArtworks] = useState<PhotoEntity[]>([]);
  const { pictures, handleSortChange, selectedOption, sortOptions } = useSort(artworks);
  const [selectedColor, setSelectedColor] = useState<string>('');

  useEffect(() => {
    if (!categoryId) return;
    (async () => {
      const data = await getPhotosByCategoryQuery(categoryId as string);
      setArtworks(data);
    })();
  }, [categoryId]);

  const filteredPictures = selectedColor
    ? pictures.filter(
        (pic) => pic.base_color.toLowerCase() === selectedColor.toLowerCase()
      )
    : pictures;

  return (
    <div>
      <SelectionBar
        handleSortChange={handleSortChange}
        selectedOption={selectedOption}
        sortOptions={sortOptions}
        handleColorChange={setSelectedColor}
        pictures={pictures}
      />

      <section>
        <div className={styles.pictureContainer}>
          {filteredPictures.length > 0 ? (
            filteredPictures.map((pic) => (
              <div key={pic.id} className={styles.pictureField}>
                <Image
                  className={styles.picture}
                  src={pic.image_url}
                  alt={pic.name}
                  width={200}
                  height={150}
                />
                <p className={styles.pictureLabel}>
                  {pic.name} – {pic.price} CHF
                </p>
              </div>
            ))
          ) : (
            <p className={styles.noResults}>Keine Bilder in dieser Kategorie</p>
          )}
        </div>
      </section>
    </div>
  );
}
