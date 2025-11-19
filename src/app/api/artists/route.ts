import { NextResponse } from 'next/server';
import { ArtistRepositoryImpl } from '@/infrastructure/repositories/artist.repository.impl';
import { GetAllArtistsHandler } from '@/domain/artist/handlers/getAllArtists.handler';
import { GetAllArtistsQuery } from '@/domain/artist/queries/getAllArtist.query';

/**
 * GET /api/artists
 * Server-side route that returns all artists.
 * Uses the same repository + handler from your domain layer (server-side safe).
 */
export async function GET() {
  try {
    const repo = new ArtistRepositoryImpl();
    const handler = new GetAllArtistsHandler(repo);
    const artists = await handler.execute(new GetAllArtistsQuery());

    return NextResponse.json(artists, { status: 200 });
  } catch (error) {
    console.error('GET /api/artists error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}