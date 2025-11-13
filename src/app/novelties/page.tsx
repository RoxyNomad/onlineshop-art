'use client';

import { useEffect, useState } from 'react';
import { getLatestNoveltiesQuery } from '@/domain/novelties/queries/getNovelties.query';
import { NoveltyEntity } from '@/domain/novelties/entities/novelty.entity';
import { useSort } from '@/ui/hooks/useSort';
import SelectionBar from '@/ui/shop/SelectionBarNovelties';
import Image from 'next/image';
import styles from '@/src/styles/novelties/novelties.module.scss';

export default function NoveltiesPage() {
  const [artworks, setArtworks] = useState<NoveltyEntity[]>([]);
  const { pictures, handleSortChange, selectedOption, sortOptions } = useSort(artworks);

  useEffect(() => {
    (async () => {
      const latest = await getLatestNoveltiesQuery();
      setArtworks(latest);
    })();
  }, []);

  return (
    <div>
      <SelectionBar
        handleSortChange={handleSortChange}
        handleColorChange={() => {}}
        selectedOption={selectedOption}
        sortOptions={sortOptions}
        pictures={pictures}
      />

      <section>
        <div className={styles.pictureContainer}>
          {pictures.map((pic) => (
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
          ))}
        </div>
      </section>
    </div>
  );
}
