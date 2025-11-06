import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_TEST_KEY!, {
  apiVersion: "2025-10-29.clover",
});

export const config = { api: { bodyParser: false } };

export const POST = async (req: Request) => {
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  try {
    // Convert Web ReadableStream to Buffer
    const buffer = Buffer.from(await req.arrayBuffer());

    const event = stripe.webhooks.constructEvent(
      buffer,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log("Webhook Event empfangen:", event.type);

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }
};
