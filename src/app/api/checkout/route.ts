import { NextResponse } from "next/server";
import { CreateCheckoutSessionCommand } from "@/modules/order/application/commands/create-checkout-session.command";
import { CreateCheckoutSessionHandler } from "@/modules/order/application/handlers/create-checkout-session.handler";
import { auth } from "@/shared/infrastructure/auth/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
    try {
        // Authentifizierung prüfen
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
        }

        const body = await req.json();

        // Erstelle Command
        const command = new CreateCheckoutSessionCommand({
            userId: session.user.id,
            customerEmail: session.user.email,
            items: body.items,
        });

        // Handler ausführen
        const handler = new CreateCheckoutSessionHandler();
        const result = await handler.execute(command);

        return NextResponse.json(result);
    } catch (error: unknown) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Fehler beim Erstellen der Checkout-Session" },
            { status: 500 }
        );
    }
}