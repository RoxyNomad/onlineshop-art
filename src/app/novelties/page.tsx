"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { NoveltiesEntity } from "@/domain/novelties/entities/novelties.entity";
import SelectionBarNovelties from "@/ui/shop/SelectionBarNovelties";
import { getNoveltiesByFilter } from "@/domain/novelties/handlers/novelties.handler";
import { useNoveltiesSort } from "@/ui/hooks/useNoveltiesSort";
import Image from "next/image";
import styles from "@/ui/styles/novelties/novelties.module.scss";

export default function NoveltiesPage() {
  const searchParams = useSearchParams();
  const [artistId, setArtistId] = useState<string>(searchParams.get("artist") || "");
  const [novelties, setNovelties] = useState<NoveltiesEntity[]>([]);

  const { novelties: pictures, selectedOption, sortOptions, handleSortChange } =
    useNoveltiesSort(novelties);

  useEffect(() => {
    const fetchData = async () => {
      const filtered = await getNoveltiesByFilter({ artistId: artistId || undefined });
      setNovelties(filtered);
    };
    fetchData();
  }, [artistId]);

  return (
    <div>
      <SelectionBarNovelties
        handleSortChange={handleSortChange}
        handleArtistChange={setArtistId}
        selectedOption={selectedOption}
        sortOptions={sortOptions}
      />

      <section>
        <div className={styles.pictureContainer}>
          {pictures.map((pic) => (
            <div key={pic.id} className={styles.pictureField}>
              <Image
                className={styles.picture}
                src={pic.imageUrl}
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
