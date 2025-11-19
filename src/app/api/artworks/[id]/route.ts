import { NextResponse } from "next/server";
import prisma from "@/infrastructure/providers/db/db";
import { UpdateArtworkDTO } from "@/domain/artworks/dtos/artworks.dto";

interface Params {
  params: { id: string };
}

export async function GET({ params }: Params) {
  try {
    const artwork = await prisma.artwork.findUnique({
      where: { id: params.id },
      include: {
        artist: true,
        category: true,
      },
    });

    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 });
    }

    return NextResponse.json(artwork);
  } catch (error) {
    console.error("Error fetching artwork:", error);
    return NextResponse.json({ error: "Failed to load artwork" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const body: UpdateArtworkDTO = await req.json();

    const updated = await prisma.artwork.update({
      where: { id: params.id },
      data: {
        name: body.name,
        imageUrl: body.imageUrl,
        price: body.price,
        baseColor: body.baseColor,
        categoryId: body.categoryId,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating artwork:", error);
    return NextResponse.json({ error: "Failed to update artwork" }, { status: 500 });
  }
}

export async function DELETE({ params }: Params) {
  try {
    await prisma.artwork.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: "Artwork deleted" });
  } catch (error) {
    console.error("Error deleting artwork:", error);
    return NextResponse.json({ error: "Failed to delete artwork" }, { status: 500 });
  }
}
