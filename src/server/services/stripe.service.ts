// src/server/services/stripe.service.ts
import Stripe from "stripe";
import { pool } from "@/src/lib/db"; // Neon DB Pool

const stripe = new Stripe(process.env.STRIPE_SECRET_TEST_KEY as string, {
    apiVersion: "2025-02-24.acacia",
});

export const createCheckoutSession = async (userId: string) => {
    try {
        console.log("🚀 Lade Warenkorb für User:", userId);

        // Fetch cart items from Neon DB
        const { rows: cartItems } = await pool.query<{
            id: string;
            artwork_name: string;
            price: number;
            quantity: number;
        }>("SELECT id, artwork_name, price, quantity FROM cart WHERE user_id = $1", [
            userId,
        ]);

        if (!cartItems || cartItems.length === 0) {
            throw new Error("❌ Warenkorb ist leer!");
        }

        console.log("🛒 Warenkorb:", cartItems);

        // Create Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: cartItems.map((item) => ({
                price_data: {
                    currency: "chf",
                    product_data: { name: item.artwork_name },
                    unit_amount: Math.round(item.price * 100), // Stripe expects cents
                },
                quantity: item.quantity,
            })),
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/cancel`,
        });

        console.log("✅ Stripe-Session erstellt:", session.url);
        return session;
    } catch (error) {
        console.error("Fehler beim Erstellen der Checkout-Session:", error);
        throw new Error(
            error instanceof Error ? error.message : "Fehler bei der Stripe-API-Anfrage."
        );
    }
};
