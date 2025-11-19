import { NextResponse } from "next/server";
import prisma from "@/infrastructure/providers/db/db";

// GET: Fetch all categories
export const GET = async () => {
  try {
    // Prisma returns the result as a typed array directly
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: "asc" },
    });

    // Convert numeric IDs into strings if needed (optional)
    const formatted = categories.map((cat) => ({
      id: String(cat.id),
      name: cat.name,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Error fetching categories" },
      { status: 500 }
    );
  }
};

// POST: Create a new category
export const POST = async (req: Request) => {
  try {
    const { name }: { name: string } = await req.json();

    const category = await prisma.category.create({
      data: { name },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json({
      id: String(category.id),
      name: category.name,
    });
  } catch (error) {
    console.error("Error adding category:", error);
    return NextResponse.json(
      { error: "Error adding category" },
      { status: 500 }
    );
  }
};
