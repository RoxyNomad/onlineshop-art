import { useEffect, useState } from "react";
import { NextPage } from "next";
import { ArtistInfo } from "@/server/shared/types/artist.types";
import styles from "@/src/styles/artists/profile.module.scss";
import Sidebar from "@/components/dashboard/ArtistSidebar";
import Image from "next/image";
import Link from "next/link";

const ArtistProfile: NextPage & { disableHeader?: boolean } = () => {
  const [artistInfo, setArtistInfo] = useState<ArtistInfo | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formState, setFormState] = useState({
    name: "",
    bio: "",
    portfolioUrl: "",
    profileImageUrl: "",
    coverImageUrl: "",
  });

  const artistId = "123"; // z.B. aus Session / LocalStorage oder Query Param

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch(`/api/profile?artistId=${artistId}`);
      const data = await res.json();
      setArtistInfo(data);
      setFormState({
        name: data.artist_name ?? "",
        bio: data.bio ?? "",
        portfolioUrl: data.portfolio_url ?? "",
        profileImageUrl: data.profile_image_url ?? "",
        coverImageUrl: data.cover_image_url ?? "",
      });
    };
    fetchProfile();
  }, [artistId]);

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artistId, ...formState }),
      });
      const updated = await res.json();
      setArtistInfo(updated);
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("Fehler beim Speichern");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className={styles.profilePage}>
        <div className={styles.profileContainer}>
          {artistInfo ? (
            <>
              <div className={styles.profileHeader}>
                <h1>Dein Profil</h1>
                <button onClick={() => setEditing(!editing)}>
                  {editing ? "Abbrechen" : "Profil bearbeiten"}
                </button>
              </div>

              {editing ? (
                <div>
                  <input value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} />
                  <textarea value={formState.bio} onChange={(e) => setFormState({ ...formState, bio: e.target.value })} />
                  <input type="url" value={formState.portfolioUrl} onChange={(e) => setFormState({ ...formState, portfolioUrl: e.target.value })} />
                  <input type="text" placeholder="Profile Image URL" value={formState.profileImageUrl} onChange={(e) => setFormState({ ...formState, profileImageUrl: e.target.value })} />
                  <input type="text" placeholder="Cover Image URL" value={formState.coverImageUrl} onChange={(e) => setFormState({ ...formState, coverImageUrl: e.target.value })} />
                  <button onClick={handleSaveProfile} disabled={loading}>{loading ? "Speichert..." : "Speichern"}</button>
                </div>
              ) : (
                <div>
                  {artistInfo.profile_image_url && <Image src={artistInfo.profile_image_url} alt="Profilbild" width={250} height={250} />}
                  {artistInfo.cover_image_url && <Image src={artistInfo.cover_image_url} alt="Cover" width={250} height={125} />}
                  <p><strong>Name:</strong> {artistInfo.artist_name}</p>
                  <p><strong>Bio:</strong> {artistInfo.bio}</p>
                  <p><strong>Portfolio:</strong> <Link href={artistInfo.portfolio_url ?? ""}>{artistInfo.portfolio_url}</Link></p>
                </div>
              )}
            </>
          ) : (
            <p>Lade Profil...</p>
          )}
        </div>
      </div>
    </div>
  );
};

ArtistProfile.disableHeader = true;

export default ArtistProfile;
