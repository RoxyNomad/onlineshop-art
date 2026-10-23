import { stripe } from "@/shared/infrastructure/stripe/client";
import { CreateCheckoutSessionCommand } from "../commands/create-checkout-session.command";

export class CreateCheckoutSessionHandler {
    async execute(command: CreateCheckoutSessionCommand): Promise<{ checkoutUrl: string }> {
        const { userId, customerEmail, items } = command.payload;

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

        // Mappe die Items in das von Stripe erwartete Format
        const lineItems = items.map((item) => ({
            price_data: {
                currency: "eur", // Oder "chf"
                product_data: {
                    name: item.title,
                    images: item.imageUrl ? [item.imageUrl] : [],
                    metadata: {
                        artworkId: item.artworkId,
                    },
                },
                unit_amount: item.priceInCents,
            },
            quantity: item.quantity,
        }));

        // Erstelle die Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            customer_email: customerEmail,
            success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/checkout/cancel`,
            metadata: {
                userId,
                // Wir speichern relevante Daten in der Metadata, um sie im Webhook wiederzuerkennen
            },
        });

        if (!session.url) {
            throw new Error("Stripe Checkout-Session konnte nicht erstellt werden.");
        }

        return { checkoutUrl: session.url };
    }
}