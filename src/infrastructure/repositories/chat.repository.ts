import { IMessageRepository } from "@/domain/chat/repositories/message.repository";
import { ChatMessage } from "@/infrastructure/shared/types/chat.types";

/**
 * Implementation of IMessageRepository that communicates with the API layer.
 * Responsible for fetching, updating, and handling data.
 */
export class ChatRepository implements IMessageRepository {
  async getUnreadMessages(receiverId: string): Promise<ChatMessage[]> {
    const res = await fetch(`/api/messages?receiverId=${receiverId}&unread=true`);
    if (!res.ok) throw new Error("Failed to fetch unread messages");
    return res.json();
  }

  async getSenderName(userId: string): Promise<string> {
    const res = await fetch(`/api/users?userId=${userId}`);
    const data = await res.json();
    return data?.name || `Unbekannt (${userId})`;
  }

  async markMessagesAsRead(senderId: string, receiverId: string): Promise<void> {
    await fetch(`/api/messages/mark-read`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senderId, receiverId }),
    });
  }
}
