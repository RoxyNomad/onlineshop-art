import { NextRequest, NextResponse } from "next/server";
import { ChatService } from "@/server/modules/chat/chat.service";

const chatService = new ChatService();

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const contactId = searchParams.get("contactId");

    if (!userId || !contactId) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const messages = await chatService.getConversation(userId, contactId);
    return NextResponse.json(messages);
};

export const PUT = async (req: NextRequest) => {
    const body = await req.json();
    const { senderId, receiverId } = body;

    if (!senderId || !receiverId) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    await chatService.markConversationAsRead(senderId, receiverId);
    return NextResponse.json({ message: "Conversation marked as read" });
};