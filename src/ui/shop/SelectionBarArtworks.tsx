"use client";

import { useState, useEffect } from "react";
import { SelectionBarProps } from "@/ui/shop/ui.types";
import Link from "next/link";
import Image from "next/image";
import styles from "@/ui/styles/components/selectionBar.module.scss";
import { fetchColors } from "@/domain/artworks/queries/fetchColors.query";
import { fetchCategories } from "@/domain/artworks/queries/fetchCategories.query";
import { Color, Category } from "@/domain/artworks/entities/filter.entity";
import { updateUrlParam } from "@/utils/urlFilters";

const SelectionBarArtworks: React.FC<SelectionBarProps> = ({
  handleSortChange,
  handleColorChange,
  handleCategoryChange,
  handlePriceChange,
  selectedOption,
  sortOptions,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [colors, setColors] = useState<Color[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedMinPrice, setSelectedMinPrice] = useState<number | undefined>(undefined);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number | undefined>(undefined);

  useEffect(() => {
    const loadFilters = async () => {
      const [colorsFromDB, categoriesFromDB] = await Promise.all([
        fetchColors(),
        fetchCategories(),
      ]);
      setColors(colorsFromDB);
      setCategories(categoriesFromDB);
    };
    loadFilters();
  }, []);

  const handleColorSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedColor(value);
    updateUrlParam('color', value);
    handleColorChange(value);
  };

  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    updateUrlParam('category', value);
    if (handleCategoryChange) handleCategoryChange(value);
  };

  const handleSortClick = (opt: string) => {
    updateUrlParam('sort', opt);
    handleSortChange(opt); 
  }

  const handleMinPriceChange = (value: string) => {
    const num = value ? Number(value) : undefined;
    setSelectedMinPrice(num);
    updateUrlParam("minPrice", num);
    handlePriceChange?.(num, selectedMaxPrice);
  };

  const handleMaxPriceChange = (value: string) => {
    const num = value ? Number(value) : undefined;
    setSelectedMaxPrice(num);
    updateUrlParam("maxPrice", num);
    handlePriceChange?.(selectedMinPrice, num);
  };

  const updateSortParam = (option: string) => {
    const url = new URL(window.location.href);
    if (option) url.searchParams.set("sort", option);
    else url.searchParams.delete("sort");
    window.history.replaceState({}, "", url.toString());
  };

  return (
    <div>
      <section className={styles.selectionBar}>
        <div className={styles.displaySelection}>
          <button className={styles.displaySelectionButtonStandart}>
            Standardanzeige
          </button>

          <Link href="/photography/fullscreen">
            <button className={styles.displaySelectionButtonFullscreen}>
              Vollbildanzeige
            </button>
          </Link>
        </div>

        <div className={styles.sortSelection}>
          <button className={styles.sortSelectionButton} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Image src="/icons/filter-icon.png" alt="Filter Icon" width={18} height={18} />
            Filter
          </button>

          <button className={styles.sortSelectionButton} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
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
                    onChange={() => {
                      handleSortChange(opt);
                      updateSortParam(opt);
                    }}
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
          {/* Farbe */}
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
            {colors.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Kategorie */}
          <label htmlFor="categoryFilter" className={styles.dropdownLabel}>
            Kategorie auswählen:
          </label>
          <select
            id="categoryFilter"
            value={selectedCategory}
            onChange={handleCategorySelect}
            className={styles.dropdownSelect}
          >
            <option value="">Alle Kategorien</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <label htmlFor="minPrice" className={styles.dropdownLabel}>
            Minimalpreis:
          </label>
          <input
            id="minPrice"
            type="number"
            min={0}
            value={selectedMinPrice ?? ""}
            onChange={(e) => handleMinPriceChange(e.target.value)}
            className={styles.dropdownInput}
          />

          <label htmlFor="maxPrice" className={styles.dropdownLabel}>
            Maximalpreis:
          </label>
          <input
            id="maxPrice"
            type="number"
            min={0}
            value={selectedMaxPrice ?? ""}
            onChange={(e) => handleMaxPriceChange(e.target.value)}
            className={styles.dropdownInput}
          />
        </div>
      </aside>

      {isSidebarOpen && <div className={styles.overlay} onClick={() => setIsSidebarOpen(false)} />}
    </div>
  );
};

export default SelectionBarArtworks;
