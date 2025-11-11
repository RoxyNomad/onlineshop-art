import { useEffect, useState } from 'react';
import { Artist } from '@/src/domain/artist/entities/artist.entity';
import { ArtistRepositoryImpl } from '@/src/infrastructure/db/repositories/artist.repository.impl';
import { GetAllArtistsQuery } from '@/src/domain/artist/queries/get-all-artists.query';
import { GetAllArtistsHandler } from '@/src/application/artist/query-handlers/get-all-artists.handler';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/src/ui/shop/styles/artists.module.scss';

const Artists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      const repo = new ArtistRepositoryImpl();
      const handler = new GetAllArtistsHandler(repo);
      const result = await handler.execute(new GetAllArtistsQuery());
      setArtists(result);
      setLoading(false);
    };
    fetchArtists();
  }, []);

  if (loading) return <p>Loading artists...</p>;
  if (artists.length === 0) return <p>No artists found.</p>;

  return (
    <div className={styles.artistContainer}>
      {artists.map((artist) => (
        <div key={artist.id} className={styles.artist}>
          <h2 className={styles.artistName}>{artist.artist_name}</h2>
          {artist.profile_image_url && (
            <Image
              src={artist.profile_image_url}
              alt={`${artist.artist_name}'s profile`}
              width={200}
              height={200}
              className={styles.profileImage}
            />
          )}
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
          <button className={styles.artistButton}>
            <Link
              className={styles.artistLink}
              href={artist.portfolio_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio
            </Link>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Artists;