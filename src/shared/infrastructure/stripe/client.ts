import Stripe from "stripe";

// Initialisiere Stripe mit deinem Secret Key und der aktuellen API-Version
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-08-27.acacia" as any, // Oder die aktuellste von Stripe empfohlene Version
    typescript: true,
});