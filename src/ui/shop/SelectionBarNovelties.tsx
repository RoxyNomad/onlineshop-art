"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/ui/styles/components/selectionBar.module.scss";
import { SelectionBarNoveltiesProps } from "@/ui/shop/ui.types";
import { fetchArtists } from "@/domain/novelties/queries/fetchArtists.query";
import { Artist } from "@/domain/novelties/entities/filter.entity";
import { updateUrlParam } from "@/utils/urlFilters";

const SelectionBarNovelties: React.FC<SelectionBarNoveltiesProps> = ({
  handleSortChange,
  handleArtistChange,
  selectedOption,
  sortOptions,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<string>("");

  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const loadArtists = async () => {
      const list = await fetchArtists();
      setArtists(list);
    };
    loadArtists();
  }, []);

  const handleArtistSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedArtist(value);
    updateUrlParam("artist", value);
    handleArtistChange?.(value);
  };

  return (
    <div>
      <section className={styles.selectionBar}>
        <div className={styles.displaySelection}>
          <button className={styles.displaySelectionButtonStandart}>
            Standardanzeige
          </button>
          <Link href="/novelties/fullscreen">
            <button className={styles.displaySelectionButtonFullscreen}>
              Vollbildanzeige
            </button>
          </Link>
        </div>

        <div className={styles.sortSelection}>
          <button
            className={styles.sortSelectionButton}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Image src="/icons/filter-icon.png" alt="Filter Icon" width={18} height={18} />
            Filter
          </button>

          <button
            className={styles.sortSelectionButton}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Image src="/icons/sorting-icon.png" alt="Sorting Icon" width={18} height={18} />
            Sortieren nach
          </button>

          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              {sortOptions.map((opt) => (
                <label key={opt} className={styles.dropdownItem}>
                  <input
                    type="radio"
                    name="sort"
                    checked={selectedOption === opt}
                    onChange={() => handleSortChange(opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          )}
        </div>
      </section>

      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
        <div className={styles.sidebarHeader}>
          <h2>Filter</h2>
          <button className={styles.closeButton} onClick={() => setIsSidebarOpen(false)}>
            ✖
          </button>
        </div>

        <div className={styles.sidebarContent}>
          <label htmlFor="artistFilter" className={styles.dropdownLabel}>
            Künstler auswählen:
          </label>
          <select
            id="artistFilter"
            value={selectedArtist}
            onChange={handleArtistSelect}
            className={styles.dropdownSelect}
          >
            <option value="">Alle Künstler</option>
            {artists.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
      </aside>

      {isSidebarOpen && <div className={styles.overlay} onClick={() => setIsSidebarOpen(false)} />}
    </div>
  );
};

export default SelectionBarNovelties;
