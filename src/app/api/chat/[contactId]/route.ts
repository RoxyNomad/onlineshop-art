import { NextResponse } from "next/server";
import { ChatService } from "@/infrastructure/services/chat.service";

const chatService = new ChatService();

export const GET = async (req: Request, { params }: { params: { contactId: string } }) => {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const contactId = params.contactId;

    if (!userId || !contactId) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const messages = await chatService.getConversation(userId, contactId);
    return NextResponse.json(messages);
};