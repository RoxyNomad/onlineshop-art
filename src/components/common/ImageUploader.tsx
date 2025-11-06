"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import styles from "@/src/styles/artists/artworks.module.scss";
import type { Category, Props } from "@/src/services/types";

export default function ImageUploader({ onUpload, artistId }: Props) {
    const { data: session } = useSession();
    const userArtistId = artistId || session?.user?.id;

    const [uploading, setUploading] = useState(false);
    const [name, setName] = useState("");
    const [baseColor, setBaseColor] = useState("");
    const [price, setPrice] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // 🟢 Kategorien aus API abrufen
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await fetch("/api/categories");
                const data = await response.json();
                setCategories(data || []);
            } catch (error) {
                console.error("Error loading categories:", error);
            }
        };
        loadCategories();
    }, []);

    if (!userArtistId) return <p>Künstler-ID ist nicht verfügbar. Bitte anmelden.</p>;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedFile(file || null);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedCategory(value);
        setNewCategory("");
    };

    // 🟣 Cloudinary Upload
    const uploadImage = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error?.message || "Image upload failed");

        return data.secure_url;
    };

    // 🟢 Upload-Handler
    const handleUpload = async () => {
        setErrorMessage(null);
        setSuccessMessage(null);

        if (!session || !selectedFile || (!selectedCategory && !newCategory) || !name || !baseColor || !price) {
            alert("Bitte alle Felder ausfüllen und Datei auswählen.");
            return;
        }

        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            alert("Bitte einen gültigen Preis eingeben.");
            return;
        }

        try {
            setUploading(true);

            // Falls neue Kategorie erstellt wird
            let categoryId = selectedCategory;
            if (newCategory) {
                const res = await fetch("/api/categories", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: newCategory }),
                });
                const data = await res.json();
                categoryId = data.id;
                setCategories((prev) => [...prev, { id: data.id, name: newCategory }]);
            }

            // Bild zu Cloudinary
            const imageUrl = await uploadImage(selectedFile);

            // Artwork speichern
            await fetch("/api/artworks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    baseColor,
                    price: parsedPrice,
                    imageUrl,
                    categoryId,
                    artistId: userArtistId,
                }),
            });

            setSuccessMessage("Bild erfolgreich hochgeladen!");
            onUpload(imageUrl);
            setName("");
            setBaseColor("");
            setPrice("");
            setSelectedCategory("");
            setNewCategory("");
            setSelectedFile(null);
        } catch (error: any) {
            console.error("Error uploading image:", error);
            setErrorMessage("Fehler beim Hochladen: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={styles.uploadContainer}>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className={styles.uploadContainerInput} required />
            <input type="text" placeholder="Farbe" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className={styles.uploadContainerInput} required />
            <input type="number" placeholder="Preis" value={price} onChange={(e) => setPrice(e.target.value)} className={styles.uploadContainerInput} required />

            <select value={selectedCategory} onChange={handleCategoryChange} className={styles.uploadContainerInput} required>
                <option value="" disabled>Wähle eine Kategorie</option>
                {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                <option value="new">Neue Kategorie hinzufügen</option>
            </select>

            {selectedCategory === "new" && (
                <input type="text" placeholder="Neue Kategorie" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className={styles.uploadContainerInput} />
            )}

            <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className={styles.uploadContainerInput5} required />

            <button onClick={handleUpload} disabled={uploading || !session} className={styles.uploadButton}>
                {uploading ? "Hochladen..." : "Hochladen"}
            </button>
        </div>
    );
}
