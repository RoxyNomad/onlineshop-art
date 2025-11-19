"use client";

import { useEffect, useState } from "react";
import { NextPage } from "next";
import { Artist } from "@/domain/artist/entities/artist.entity";
import styles from "@/ui/styles/artists/profile.module.scss";
import Sidebar from "@/ui/dashboard/artist/ArtistSidebar";
import Image from "next/image";
import Link from "next/link";

// ✅ Use CQRS imports (Query + Command)
import { getArtistProfileQuery } from "@/domain/artist/queries/getArtistProfile.query";
import { updateArtistProfileCommand } from "@/domain/artist/commands/updateArtistProfile";

/**
 * ArtistProfile page component (DDD + CQRS version)
 * -------------------------------------------------
 * - Reads artist data via Query Layer (read-only)
 * - Updates artist data via Command Layer (write-only)
 * - Clean separation between reading and writing concerns
 */
const ArtistProfile: NextPage & { disableHeader?: boolean } = () => {
  // Local UI states
  const [artistInfo, setArtistInfo] = useState<Artist | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // ⚠️ Later this should come from session/auth context
  const artistId = "123";

  // Controlled form state for editing profile fields
  const [formState, setFormState] = useState({
    name: "",
    bio: "",
    portfolioUrl: "",
    profileImageUrl: "",
    coverImageUrl: "",
  });

  /**
   * 🟢 Fetch artist profile (READ) via Query Layer
   * ----------------------------------------------
   * Query Layer delegates to:
   * Query → Service → Repository → DB
   */
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getArtistProfileQuery(artistId);
        if (data) {
          setArtistInfo(data);
          // Initialize form fields with current artist data
          setFormState({
            name: data.artist_name ?? "",
            bio: data.bio ?? "",
            portfolioUrl: data.portfolio_url ?? "",
            profileImageUrl: data.profile_image_url ?? "",
            coverImageUrl: data.cover_image_url ?? "",
          });
        }
      } catch (err) {
        console.error("❌ Error fetching artist profile:", err);
      }
    };
    loadProfile();
  }, [artistId]);

  /**
   * 🟡 Update artist profile (WRITE) via Command Layer
   * --------------------------------------------------
   * Command Layer delegates to:
   * Command → Service → Repository → DB
   */
  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const updated = await updateArtistProfileCommand({
        artistId,
        ...formState, // name, bio, portfolioUrl, etc.
      });
      setArtistInfo(updated);
      setEditing(false);
    } catch (err) {
      console.error("❌ Error saving artist profile:", err);
      alert("Fehler beim Speichern");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Sidebar for artist navigation */}
      <Sidebar />

      <div className={styles.profilePage}>
        <div className={styles.profileContainer}>
          {artistInfo ? (
            <>
              {/* Header section */}
              <div className={styles.profileHeader}>
                <h1>Dein Profil</h1>
                <button onClick={() => setEditing(!editing)}>
                  {editing ? "Abbrechen" : "Profil bearbeiten"}
                </button>
              </div>

              {/* Edit Mode */}
              {editing ? (
                <div>
                  <input
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                  />
                  <textarea
                    value={formState.bio}
                    onChange={(e) =>
                      setFormState({ ...formState, bio: e.target.value })
                    }
                  />
                  <input
                    type="url"
                    value={formState.portfolioUrl}
                    onChange={(e) =>
                      setFormState({ ...formState, portfolioUrl: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Profile Image URL"
                    value={formState.profileImageUrl}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        profileImageUrl: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Cover Image URL"
                    value={formState.coverImageUrl}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        coverImageUrl: e.target.value,
                      })
                    }
                  />
                  <button onClick={handleSaveProfile} disabled={loading}>
                    {loading ? "Speichert..." : "Speichern"}
                  </button>
                </div>
              ) : (
                /* View Mode */
                <div>
                  {artistInfo.profile_image_url && (
                    <Image
                      src={artistInfo.profile_image_url}
                      alt="Profilbild"
                      width={250}
                      height={250}
                    />
                  )}
                  {artistInfo.cover_image_url && (
                    <Image
                      src={artistInfo.cover_image_url}
                      alt="Cover"
                      width={250}
                      height={125}
                    />
                  )}
                  <p>
                    <strong>Name:</strong> {artistInfo.artist_name}
                  </p>
                  <p>
                    <strong>Bio:</strong> {artistInfo.bio}
                  </p>
                  <p>
                    <strong>Portfolio:</strong>{" "}
                    <Link href={artistInfo.portfolio_url ?? ""}>
                      {artistInfo.portfolio_url}
                    </Link>
                  </p>
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

// Hide header in dashboard layout (if supported)
ArtistProfile.disableHeader = true;

export default ArtistProfile;
