import { NextResponse } from "next/server";
import prisma from "@/infrastructure/providers/db/db";
import { CreateArtworkDTO } from "@/domain/artworks/dtos/artworks.dto";

// GET /api/artworks?page=1&limit=20&sort=price&order=asc
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 20);

    const sort = searchParams.get("sort") || "createdAt";
    const order = searchParams.get("order") === "asc" ? "asc" : "desc";

    const artworks = await prisma.artwork.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sort]: order
      },
      include: {
        artist: true,
        category: true
      }
    });

    const total = await prisma.artwork.count();

    return NextResponse.json({
      data: artworks,
      pagination: {
        page,
        limit,
        total,
      }
    });
  } catch (error) {
    console.error("Error fetching artworks:", error);
    return NextResponse.json({ error: "Failed to load artworks" }, { status: 500 });
  }
}

// POST /api/artworks
export async function POST(req: Request) {
  try {
    const body: CreateArtworkDTO = await req.json();

    const created = await prisma.artwork.create({
      data: {
        name: body.name,
        imageUrl: body.imageUrl,
        baseColor: body.baseColor,
        price: body.price,
        artistId: body.artistId,
        categoryId: body.categoryId,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error creating artwork:", error);
    return NextResponse.json({ error: "Failed to create artwork" }, { status: 500 });
  }
}
