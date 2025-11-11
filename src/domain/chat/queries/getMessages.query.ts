import { ChatMessage } from "@/domain/chat/entities/chat.entity";

export async function fetchMessagesQuery(userId: string): Promise<ChatMessage[]> {
  const res = await fetch(`/api/messages?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}
