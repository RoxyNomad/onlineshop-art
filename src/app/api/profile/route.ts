import { NextRequest, NextResponse } from "next/server";
import { getArtistProfileQuery } from "@/domain/artist/queries/getArtistProfile.query";
import { updateArtistProfileCommand } from "@/domain/artist/commands/updateArtistProfile";

export const GET = async (req: NextRequest) => {
  try {
    const artistId = req.nextUrl.searchParams.get("artistId");
    if (!artistId) {
      return NextResponse.json({ error: "artistId is required" }, { status: 400 });
    }

    // ✅ Use Query Layer (not repository directly)
    const artist = await getArtistProfileQuery(artistId);

    if (!artist) {
      return NextResponse.json({ error: "Artist not found" }, { status: 404 });
    }

    return NextResponse.json(artist);
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { artistId, name, bio, portfolioUrl, profileImageUrl, coverImageUrl } = body;

    if (!artistId) {
      return NextResponse.json({ error: "artistId is required" }, { status: 400 });
    }

    // ✅ Use Command Layer (business logic via service)
    const updatedArtist = await updateArtistProfileCommand({
      artistId,
      name,
      bio,
      portfolioUrl,
      profileImageUrl,
      coverImageUrl,
    });

    return NextResponse.json(updatedArtist, { status: 200 });
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
