"use client";

import { useState, useEffect } from "react";
import { SelectionBarProps } from "@/infrastructure/shared/types/ui.types";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/components/selectionBar.module.scss";

// CQRS Query aus Core Layer
import { fetchColors } from "@/domain/shop/queries/fetchColors.query";
import { Color } from "@/domain/shop/entities/filter.entity";

const SelectionBar: React.FC<SelectionBarProps> = ({
  handleSortChange,
  handleColorChange,
  selectedOption,
  sortOptions,
}) => {
  // UI States
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("");

  // Farben aus Core Layer Query
  const [colors, setColors] = useState<Color[]>([]);

  // Toggle Dropdown und Sidebar
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Farben bei Mount laden
  useEffect(() => {
    const loadColors = async () => {
      try {
        const colorsFromDB = await fetchColors();
        setColors(colorsFromDB);
      } catch (err) {
        console.error("Error loading colors:", err);
      }
    };
    loadColors();
  }, []);

  // Farbauswahl an Parent weitergeben
  const handleColorSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const color = event.target.value;
    setSelectedColor(color);
    handleColorChange(color); // Filter-Logik liegt außerhalb
  };

  return (
    <div>
      {/* Hauptauswahlleiste */}
      <section className={styles.selectionBar}>
        <div className={styles.displaySelection}>
          <button className={styles.displaySelectionButtonStandart}>
            Standardanzeige
          </button>
          <Link href="/novelties/noveltiesFullscreen">
            <button className={styles.displaySelectionButtonFullscreen}>
              Vollbildanzeige
            </button>
          </Link>
        </div>

        <div className={styles.sortSelection}>
          <button className={styles.sortSelectionButton} onClick={toggleSidebar}>
            <Image src="/icons/filter-icon.png" alt="Filter Icon" width={18} height={18} />
            Filter
          </button>

          <button className={styles.sortSelectionButton} onClick={toggleDropdown}>
            <Image src="/icons/sorting-icon.png" alt="Sorting Icon" width={18} height={18} />
            Sortieren nach
          </button>

          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              {sortOptions.map((option) => (
                <label key={option} className={styles.dropdownItem}>
                  <input
                    type="radio"
                    name="sort"
                    checked={selectedOption === option}
                    onChange={() => handleSortChange(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sidebar für Filter */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
        <div className={styles.sidebarHeader}>
          <h2>Filter</h2>
          <button className={styles.closeButton} onClick={toggleSidebar}>✖</button>
        </div>

        <div className={styles.sidebarContent}>
          <label htmlFor="colorFilter" className={styles.dropdownLabel}>
            Farbe auswählen:
          </label>
          <select
            id="colorFilter"
            value={selectedColor}
            onChange={handleColorSelect}
            className={styles.dropdownSelect}
          >
            <option value="">Alle Farben</option>
            {colors.length > 0
              ? colors.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)
              : <option>Keine Farben verfügbar</option>}
          </select>
        </div>
      </aside>

      {isSidebarOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
    </div>
  );
};

export default SelectionBar;
