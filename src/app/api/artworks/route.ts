import { NextRequest, NextResponse } from "next/server";
import { uploadArtwork } from "@/domain/artworks/commands/uploadArtwork.command";
import { getArtworksByArtist } from "@/domain/artworks/queries/getArtworksByArtist.query";
import { Artwork } from "@/infrastructure/shared/types/artwork.types";

// POST: Upload a new artwork
export const POST = async (req: NextRequest) => {
  try {
    const {
      artistId,
      name,
      baseColor,
      price,
      categoryId,
      imageUrl,
    }: {
      artistId: string;
      name: string;
      baseColor: string;
      price: number;
      categoryId?: number;
      imageUrl: string;
    } = await req.json();

    const newArtwork: Artwork = await uploadArtwork({
      artistId,
      name,
      baseColor,
      price,
      categoryId,
      imageUrl,
    });

    return NextResponse.json({ artwork: newArtwork }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Unknown error", error);
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
};

// GET: Get all artworks for a specific artist
export const GET = async (req: NextRequest) => {
  try {
    const artistId = req.nextUrl.searchParams.get("artistId");
    if (!artistId) {
      return NextResponse.json({ error: "artistId is required" }, { status: 400 });
    }

    const artworks: Artwork[] = await getArtworksByArtist(artistId);

    return NextResponse.json({ artworks }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Unknown error", error);
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
};
