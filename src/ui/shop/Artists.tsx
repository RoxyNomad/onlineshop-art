'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '@/ui/shop/styles/artists.module.scss';
import { Artist } from '@/domain/artist/entities/artist.entity';

/**
 * Client-side component that fetches artists from the server API.
 * Keeps translations simple and local to the component using router.locale.
 */

/* Minimal inline translations — you can move these into your ui/locales/* JSON files */
const translations: Record<string, Record<string, string>> = {
  en: {
    loading: 'Loading artists...',
    noArtists: 'No artists found.',
    portfolio: 'Portfolio',
    artworks: 'Artworks',
    chat: 'Chat',
    viewProfile: 'View profile',
  },
  de: {
    loading: 'Künstler werden geladen...',
    noArtists: 'Keine Künstler gefunden.',
    portfolio: 'Portfolio',
    artworks: 'Werke',
    chat: 'Chat',
    viewProfile: 'Profil ansehen',
  },
  fr: {
    loading: 'Chargement des artistes...',
    noArtists: 'Aucun artiste trouvé.',
    portfolio: 'Portfolio',
    artworks: 'Œuvres',
    chat: 'Chat',
    viewProfile: 'Voir le profil',
  },
  it: {
    loading: 'Caricamento artisti...',
    noArtists: 'Nessun artista trovato.',
    portfolio: 'Portfolio',
    artworks: 'Opere',
    chat: 'Chat',
    viewProfile: 'Vedi il profilo',
  },
};

const Artists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Determine locale and fallback to 'en'
  const locale = (router as any).locale ?? 'en';
  const t = translations[locale] ?? translations.en;

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await fetch('/api/artists');
        if (!res.ok) throw new Error('Failed to fetch artists');
        const data: Artist[] = await res.json();
        setArtists(data);
      } catch (error) {
        console.error('Fetch artists error:', error);
        setArtists([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  if (loading) return <p>{t.loading}</p>;
  if (artists.length === 0) return <p>{t.noArtists}</p>;

  return (
    <div className={styles.artistContainer}>
      {artists.map((artist) => (
        <div key={artist.id} className={styles.artist}>
          <h2 className={styles.artistName}>{artist.artist_name}</h2>

          {/* Profile Image (if exists) */}
          {artist.profile_image_url && (
            <Image
              src={artist.profile_image_url}
              alt={`${artist.artist_name}'s profile`}
              width={200}
              height={200}
              className={styles.profileImage}
            />
          )}

          {/* Cover Image (if exists) */}
          {artist.cover_image_url && (
            <Image
              src={artist.cover_image_url}
              alt={`${artist.artist_name}'s cover`}
              width={300}
              height={150}
              className={styles.coverImage}
            />
          )}

          <p className={styles.artistBio}>{artist.bio}</p>

          <div className={styles.buttonRow}>
            {/* Portfolio (external) */}
            {artist.portfolio_url && (
              <a
                className={styles.artistButton}
                href={artist.portfolio_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.portfolio}
              </a>
            )}

            {/* View Artist Detail (internal) */}
            <Link className={styles.artistButton} href={`/artist/${artist.id}`}>
              {t.viewProfile}
            </Link>

            {/* Artworks filtered by artist */}
            <Link
              className={styles.artistButton}
              href={`/artworks?artistId=${encodeURIComponent(artist.id)}`}
            >
              {t.artworks}
            </Link>

            {/* Chat link (opens chat with this artist) */}
            <Link className={styles.artistButton} href={`/chat/${artist.id}`}>
              {t.chat}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Artists;