'use client';

import { useEffect, useState } from 'react';
import { ArtworkFilterService } from '@/infrastructure/services/artworks/artworkFilter.service';
import { ArtworksEntity } from '@/domain/artworks/entities/artworks.entity';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/ui/styles/artworks/artworksFullscreen.module.scss';

export default function ArtworksFullscreenPage() {
  const [pictures, setPictures] = useState<ArtworksEntity[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filterService = new ArtworkFilterService();

  useEffect(() => {
    (async () => {
      const data = await filterService.filterArtworks({});
      setPictures(data);
    })();
  }, []);

  const nextImage = () => setCurrentIndex((i) => (i + 1) % (pictures.length || 1));
  const prevImage = () => setCurrentIndex((i) => (i - 1 + (pictures.length || 1)) % (pictures.length || 1));

  return (
    <div>
      <section className={styles.selectionBar}>
        <div className={styles.displaySelection}>
          <Link href="/artworks">
            <button className={styles.displaySelectionButtonStandart}>Standardanzeige</button>
          </Link>
          <button className={styles.displaySelectionButtonFullscreen}>Vollbildanzeige</button>
        </div>
      </section>

      <section className={styles.fullscreenContainer}>
        <button className={styles.prevButton} onClick={prevImage} disabled={!pictures.length}>Vorheriges</button>

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
              <p className={styles.imageCaption}>{pictures[currentIndex].name} – {pictures[currentIndex].name}</p>
            </>
          ) : (
            <p>🚀 Lade Bilder ...</p>
          )}
        </div>

        <button className={styles.nextButton} onClick={nextImage} disabled={!pictures.length}>Nächstes</button>
      </section>
    </div>
  );
}
