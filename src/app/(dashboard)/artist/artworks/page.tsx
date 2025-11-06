import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useSession } from "next-auth/react"; // session management
import { Artwork } from "@/server/shared/types/artwork.types";
import Image from "next/image";
import styles from "@/src/styles/artists/artworks.module.scss";
import Sidebar from "@/app/(dashboard)/artist/dashboard/page";
import ImageUploader from "@/components/common/ImageUploader";

// Core
import { getArtworksByArtist } from "@/core/queries/artwork/getArtworksByArtist";
import { uploadArtwork } from "@/core/commands/artwork/uploadArtwork";

const Artworks: NextPage & { disableHeader?: boolean } = () => {
  const { data: session } = useSession();
  const artistId = session?.user?.id;

  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    if (!artistId) return;

    const fetchArtworks = async () => {
      try {
        const data = await getArtworksByArtist(artistId);
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
      // Default values, hier kannst du Input-Felder erweitern
      const newArtwork = await uploadArtwork({
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
                src={artwork.image_url}
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
