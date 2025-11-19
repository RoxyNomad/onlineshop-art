// src/core/queries/artist/getArtistById.ts
import { query } from "@/infrastructure/providers/db/db";
import { ArtistInfo } from "@/infrastructure/shared/types/artist.types";

/**
 * Fetch artist by ID from the database
 * @param artistId - Artist's ID
 * @returns ArtistInfo object or null if not found
 */
export const getArtistById = async (artistId: string): Promise<ArtistInfo | null> => {
  const result = await query<any>((prisma) =>
    prisma.artist.findUnique({
      where: { id: parseInt(artistId) },
      select: {
        id: true,
        artistName: true,
        bio: true,
        portfolioUrl: true,
        profileImageUrl: true,
        coverImageUrl: true,
      },
    })
  );

  if (!result) return null;

  return {
    id: result.id,
    artist_name: result.artistName,
    bio: result.bio,
    portfolio_url: result.portfolioUrl,
    profileImageUrl: result.profileImageUrl,
    coverImageUrl: result.coverImageUrl,
  } as ArtistInfo;
};
