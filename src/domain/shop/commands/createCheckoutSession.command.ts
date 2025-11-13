import Stripe from "stripe";
import { pool } from "@/infrastructure/providers/db/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

export interface CartItem {
  id: number;
  artwork_name: string;
  price: number;
  quantity: number;
}

export async function createCheckoutSession(userId: string) {
  // 1️⃣ Verify user exists
  const users = await pool.query<{ id: string; email: string }>(
    "SELECT id, email FROM users WHERE id = $1",
    [userId]
  );

  const user = users[0];
  if (!user) throw new Error("User not found");

  // 2️⃣ Fetch cart items
  const cartItems: CartItem[] = await pool.query<CartItem>(
    "SELECT id, artwork_name, price, quantity FROM cart WHERE user_id = $1",
    [userId]
  );

  if (!cartItems || cartItems.length === 0) throw new Error("Cart is empty");

  // 3️⃣ Create Stripe session
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

  return session;
}
