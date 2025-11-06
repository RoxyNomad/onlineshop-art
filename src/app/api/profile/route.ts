import { NextRequest, NextResponse } from "next/server";
import { getArtistById } from "@/core/queries/artist/getArtistById";
import { updateArtistProfile } from "@/core/commands/artist/updateArtistProfile";

export const GET = async (req: NextRequest) => {
  try {
    const artistId = req.nextUrl.searchParams.get("artistId");
    if (!artistId) {
      return NextResponse.json({ error: "artistId is required" }, { status: 400 });
    }

    const artist = await getArtistById(artistId);
    if (!artist) {
      return NextResponse.json({ error: "Artist not found" }, { status: 404 });
    }

    return NextResponse.json(artist);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      console.error("Unknown error", err);
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { artistId, name, bio, portfolioUrl, profileImageUrl, coverImageUrl } = body;

    if (!artistId) {
      return NextResponse.json({ error: "artistId is required" }, { status: 400 });
    }

    const updatedArtist = await updateArtistProfile(artistId, {
      artist_name: name,
      bio,
      portfolio_url: portfolioUrl,
      profile_image_url: profileImageUrl,
      cover_image_url: coverImageUrl,
    });

    return NextResponse.json(updatedArtist, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      console.error("Unknown error", err);
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
};
