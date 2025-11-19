import { NextRequest, NextResponse } from "next/server";
import { ArtworkFilterService } from "@/infrastructure/services/artworks/artworkFilter.service";
import { normalizeParam } from "@/utils/normalizeParam";

const filterService = new ArtworkFilterService();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Safe getter → converts null → undefined + normalize
    const safeGet = (key: string): string | undefined => {
      const value = searchParams.get(key);
      return value ? normalizeParam(value) : undefined;
    };

    // Safe numeric getter
    const safeGetNumber = (key: string): number | undefined => {
      const value = safeGet(key);
      if (!value) return undefined;
      const num = Number(value);
      return isNaN(num) ? undefined : num;
    };

    // Build DTO exactly matching ArtworkFilterService
    const filters = {
      categoryId: safeGet("categoryId"),
      baseColor: safeGet("baseColor"),
      artistId: safeGetNumber("artistId"),
      minPrice: safeGetNumber("minPrice"),
      maxPrice: safeGetNumber("maxPrice"),
    };

    const artworks = await filterService.filterArtworks(filters);

    return NextResponse.json(artworks, { status: 200 });
  } catch (error) {
    console.error("❌ Error in /api/artworks/filter:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
