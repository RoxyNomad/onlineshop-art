import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/shared/infrastructure/stripe/client";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // Handle das Event
    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object;
            // TODO: Hier triggern wir später deinen CQRS Order-Command (z.B. Bestellung als bezahlt markieren)
            console.log("Zahlung erfolgreich für Session:", session.id);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
}