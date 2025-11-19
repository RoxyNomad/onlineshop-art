"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { NoveltiesEntity } from "@/domain/novelties/entities/novelties.entity";
import { getNoveltiesByFilter } from "@/domain/novelties/handlers/novelties.handler";
import styles from "@/ui/styles/novelties/noveltiesFullscreen.module.scss";

export default function NoveltiesFullscreenPage() {
  const [pictures, setPictures] = useState<NoveltiesEntity[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const all = await getNoveltiesByFilter({});
      setPictures(all);
    };
    fetchData();
  }, []);

  const nextImage = () => setCurrentIndex((i) => (i + 1) % (pictures.length || 1));
  const prevImage = () =>
    setCurrentIndex((i) => (i - 1 + (pictures.length || 1)) % (pictures.length || 1));

  return (
    <div>
      <section className={styles.fullscreenContainer}>
        <button className={styles.prevButton} onClick={prevImage} disabled={!pictures.length}>
          Vorheriges
        </button>

        <div className={styles.pictureContainer}>
          {pictures.length ? (
            <>
              <Image
                src={pictures[currentIndex].imageUrl}
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
