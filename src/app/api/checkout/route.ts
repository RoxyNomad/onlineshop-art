import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import pool from "@/lib/db";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-10-29.clover",
});

// Type für Cart Item
interface CartItem {
  id: number;
  artwork_name: string;
  price: number;
  quantity: number;
}

// POST: Create a Stripe Checkout Session
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { userId?: string };
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // Verify user exists in Neon DB
    const userRes = await pool.query<{ id: string; email: string }[]>(
      "SELECT id, email FROM users WHERE id = $1",
      [userId]
    );
    const user = userRes[0];
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch cart items
    const cartRes = await pool.query(
        "SELECT id, artwork_name, price, quantity FROM cart WHERE user_id = $1",
        [userId]
    );

    // Neon liefert ein Array von Arrays, wir nehmen den ersten Eintrag
    const cartItems: CartItem[] = cartRes[0] as CartItem[];

    if (!cartItems || cartItems.length === 0) {
        return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "chf",
          product_data: { name: item.artwork_name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/cancel`,
      metadata: { userId },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    return NextResponse.json(
      { error: (err as Error).message || "Checkout session creation failed" },
      { status: 500 }
    );
  }
}