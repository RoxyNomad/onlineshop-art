'use client';

import { ReactNode, useEffect, useState } from "react";
import Sidebar from "@/ui/dashboard/artist/ArtistSidebar";
import { GetArtistProfileQuery } from "@/domain/artist/queries/getArtistProfile.query";
import { ArtistProfile } from "@/domain/artist/entities/artistProfile.entity";
import { AuthRepository } from "@/infrastructure/repositories/auth.repository";

interface ArtistLayoutProps {
  children: ReactNode;
}

const artistId = "irgendeine-id"; // z.B. aus AuthContext oder Token
const query = new GetArtistProfileQuery(repo, artistId);

const ArtistLayout = ({ children }: ArtistLayoutProps) => {
  const [profile, setProfile] = useState<ArtistProfile | null>(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
      const artistProfile = await query.execute(); // Query ausführen
      setProfile(artistProfile);
    };
    fetchProfile();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar profile={profile} />  {/* Sidebar wird mit Query-Daten befüllt */}
      <main style={{ flex: 1, padding: '1rem' }}>
        {children}
      </main>
    </div>
  );
};

export default ArtistLayout;
