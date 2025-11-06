import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

interface User {
  id: string;
  name: string | null;
  email: string;
}

export const GET = async () => {
  try {
    // Neon query returns the array directly
    const users: User[] = await pool.query<User>(
      "SELECT id, name, email FROM users ORDER BY name ASC"
    );

    return NextResponse.json(users);
  } catch (err: unknown) {
    console.error("Error fetching users:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch users" },
      { status: 500 }
    );
  }
};
