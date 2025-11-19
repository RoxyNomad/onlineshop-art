"use client";

import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Artwork } from "@/domain/artworks/entities/artworks.entity";
import Image from "next/image";
import styles from "@/ui/styles/modules/artist/artworks.module.scss";
import Sidebar from "@/app/(dashboard)/artist/dashboard/page";
import ImageUploader from "@/ui/dashboard/artist/ImageUploader";

// Core Layer (DDD + CQRS)
import { getArtworksByArtistQuery } from "@/domain/artworks/queries/getArtworksByArtist.query";
import { uploadArtworkCommand } from "@/domain/artworks/commands/uploadArtwork.command";

const Artworks: NextPage & { disableHeader?: boolean } = () => {
  const { data: session } = useSession();
  const artistId = session?.user?.id;
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    if (!artistId) return;

    const fetchArtworks = async () => {
      try {
        const data = await getArtworksByArtistQuery(artistId);
        setArtworks(data);
      } catch (err) {
        console.error("Error fetching artworks:", err);
      }
    };

    fetchArtworks();
  }, [artistId]);

  if (!session) return <p>Bitte logge dich ein, um deine Kunstwerke zu sehen.</p>;

  const handleUpload = async (imageUrl: string) => {
    if (!artistId) return;

    try {
      const newArtwork = await uploadArtworkCommand({
        artistId,
        name: "Neues Kunstwerk",
        baseColor: "Weiß",
        price: 10,
        imageUrl,
      });

      setArtworks((prev) => [newArtwork, ...prev]);
    } catch (err) {
      console.error("Error uploading artwork:", err);
    }
  };

  return (
    <div>
      <Sidebar />
      <ImageUploader onUpload={handleUpload} artistId={artistId} />
      <div className={styles.artworksContainer}>
        {artworks.length === 0 ? (
          <p>Keine Kunstwerke vorhanden. Lade ein neues Bild hoch.</p>
        ) : (
          artworks.map((artwork) => (
            <div key={artwork.id}>
              <Image
                className={styles.picture}
                src={artwork.imageUrl}
                alt={`Artwork ${artwork.id}`}
                width={300}
                height={200}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

Artworks.disableHeader = true;
export default Artworks;
