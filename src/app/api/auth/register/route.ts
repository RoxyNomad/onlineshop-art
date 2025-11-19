import { NextResponse } from "next/server";
import { handleRegister } from "./handler";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const result = await handleRegister(data);

        if (result.error) {
            return NextResponse.json({ error: result.error }, { status: 400 });
        }

        return NextResponse.json(result);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
