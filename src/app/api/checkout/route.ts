import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/domain/shop/commands/createCheckoutSession.command";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId)
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });

    const session = await createCheckoutSession(userId);

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Checkout failed" },
      { status: 500 }
    );
  }
}
