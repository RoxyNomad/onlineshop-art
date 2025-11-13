import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/infrastructure/providers/db/db";

interface User {
  id: string;
  email: string;
  name: string | null;
}

export const GET = async (req: NextRequest) => {
  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    // Query NeonDB correctly
    const result = await pool.query<User>(
      "SELECT id, email, name FROM users WHERE email = $1",
      [email]
    );

    const user = result[0];

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err: unknown) {
    console.error("Error fetching user:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal Server Error" },
      { status: 500 }
    );
  }
};
