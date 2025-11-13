'use client';

import { useEffect, useState } from 'react';
import { getAllPhotosQuery } from '@/domain/photography/queries/getPhotos.query';
import { PhotoEntity } from '@/domain/photography/entities/photo.entity';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/photography/photographyFullscreen.module.scss';

export default function PhotographyFullscreenPage() {
  const [pictures, setPictures] = useState<PhotoEntity[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const data = await getAllPhotosQuery();
      setPictures(data);
    })();
  }, []);

  const nextImage = () =>
    setCurrentIndex((i) => (i + 1) % (pictures.length || 1));
  const prevImage = () =>
    setCurrentIndex((i) => (i - 1 + (pictures.length || 1)) % (pictures.length || 1));

  return (
    <div>
      <section className={styles.selectionBar}>
        <div className={styles.displaySelection}>
          <Link href="/photography">
            <button className={styles.displaySelectionButtonStandart}>Standardanzeige</button>
          </Link>
          <button className={styles.displaySelectionButtonFullscreen}>Vollbildanzeige</button>
        </div>
      </section>

      <section className={styles.fullscreenContainer}>
        <button className={styles.prevButton} onClick={prevImage} disabled={!pictures.length}>
          Vorheriges
        </button>

        <div className={styles.pictureContainer}>
          {pictures.length ? (
            <>
              <Image
                src={pictures[currentIndex].image_url}
                alt={pictures[currentIndex].name}
                width={800}
                height={600}
                className={styles.fullscreenImage}
              />
              <p className={styles.imageCaption}>{pictures[currentIndex].name}</p>
            </>
          ) : (
            <p>🚀 Lade Bilder ...</p>
          )}
        </div>

        <button className={styles.nextButton} onClick={nextImage} disabled={!pictures.length}>
          Nächstes
        </button>
      </section>
    </div>
  );
}
