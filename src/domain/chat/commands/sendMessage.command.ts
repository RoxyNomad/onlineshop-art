import { ChatMessage } from "@/domain/chat/entities/chat.entity";

/**
 * Command to send a chat message.
 * In real scenario, this would call an API endpoint.
 */
export async function sendMessageCommand(message: string, senderId: string, receiverId: string): Promise<ChatMessage> {
  const res = await fetch("/api/chat/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, senderId, receiverId }),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  const data: ChatMessage = await res.json();
  return data;
}
