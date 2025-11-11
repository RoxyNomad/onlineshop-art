"use client";
import { useState, useEffect } from "react";
import { SelectionBarProps } from "@/infrastructure/shared/types/ui.types";
import Link from "next/link";
import Image from "next/image";
import styles from "@/src/styles/components/selectionBar.module.scss";
import { fetchColors } from "@/domain/shop/queries/fetchColors.query";
import { fetchCategories } from "@/domain/shop/queries/fetchCategories.query";
import { Color, Category } from "@/domain/shop/entities/filter.entity";

const SelectionBar: React.FC<SelectionBarProps> = ({
  handleSortChange,
  handleColorChange,
  handleCategoryChange,
  selectedOption,
  sortOptions,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [colors, setColors] = useState<Color[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Load filter options
  useEffect(() => {
    const loadFilters = async () => {
      const [colorsFromDB, categoriesFromDB] = await Promise.all([fetchColors(), fetchCategories()]);
      setColors(colorsFromDB);
      setCategories(categoriesFromDB);
    };
    loadFilters();
  }, []);

  const handleColorSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const color = event.target.value;
    setSelectedColor(color);
    handleColorChange(color); // Command: update parent state
  };

  const handleCategorySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    handleCategoryChange(category); // Command: update parent state
  };

  return (
    <div>
      <section className={styles.selectionBar}>
        <div className={styles.displaySelection}>
          <button className={styles.displaySelectionButtonStandart}>
            Standardanzeige
          </button>
          <Link href="/photography/photographyFullscreen">
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

      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
        <div className={styles.sidebarHeader}>
          <h2>Filter</h2>
          <button className={styles.closeButton} onClick={toggleSidebar}>
            ✖
          </button>
        </div>
        <div className={styles.sidebarContent}>
          {/* Color filter */}
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
            {colors.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
          </select>

          {/* Category filter */}
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
            {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
        </div>
      </aside>

      {isSidebarOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
    </div>
  );
};

export default SelectionBar;
