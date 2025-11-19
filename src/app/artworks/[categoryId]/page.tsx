"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import SelectionBarArtworks from "@/ui/shop/SelectionBarArtworks";
import { ArtworksEntity } from "@/domain/artworks/entities/artworks.entity";
import { getFilteredArtworks } from "@/domain/artworks/handlers/artworksHandler";
import { mapSearchParamsToFilterDTO, updateUrlParam } from "@/utils/urlFilters";
import styles from "@/ui/styles/modules/artworks/artworks.module.scss";

export default function ArtworksCategoryPage() {
  const { categoryId } = useParams();
  const searchParams = useSearchParams();

  const [artworks, setArtworks] = useState<ArtworksEntity[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>(searchParams.get("color") || "");
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get("category") || "");
  const [sortOption, setSortOption] = useState<string>(searchParams.get("sort") || "Neueste");
  const [minPrice, setMinPrice] = useState<number | undefined>(
    searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined
  );
  const [maxPrice, setMaxPrice] = useState<number | undefined>(
    searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined
  );

  // Fetch artworks on any filter change
  useEffect(() => {
    const fetchData = async () => {
      const filters = mapSearchParamsToFilterDTO(searchParams, categoryId as string);
      const items = await getFilteredArtworks(filters, sortOption);
      setArtworks(items);
    };
    fetchData();
  }, [searchParams, categoryId, sortOption]);

  return (
    <div>
      <SelectionBarArtworks
        selectedOption={sortOption}
        sortOptions={["Neueste", "Älteste", "Preis ↑", "Preis ↓"]}
        handleSortChange={(opt) => {
          setSortOption(opt);
          updateUrlParam("sort", opt);
        }}
        handleColorChange={(color) => {
          setSelectedColor(color);
          updateUrlParam("color", color);
        }}
        handleCategoryChange={(category) => {
          setSelectedCategory(category);
          updateUrlParam("category", category);
        }}
        handlePriceChange={(min, max) => {
          setMinPrice(min);
          setMaxPrice(max);
          updateUrlParam("minPrice", min);
          updateUrlParam("maxPrice", max);
        }}
      />

      <section>
        <div className={styles.pictureContainer}>
          {artworks.length ? (
            artworks.map((a) => (
              <div key={a.id} className={styles.pictureField}>
                <img src={a.image_url} alt={a.name} width={200} height={150} />
                <p className={styles.pictureLabel}>
                  {a.name} – {a.price} CHF
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
