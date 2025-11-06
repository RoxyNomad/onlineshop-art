import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

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
    // Bei Neon: query() gibt direkt ein Array zurück
    const users: User[] = await pool.query<User>(
      "SELECT id, email, name FROM users WHERE email = $1",
      [email]
    );

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(users[0]);
  } catch (err: unknown) {
    console.error("Error fetching user:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal Server Error" },
      { status: 500 }
    );
  }
};
