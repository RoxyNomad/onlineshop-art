import { ChatRepository } from "@/infrastructure/repositories/chat.repository";
import { UnreadMessage } from "@/domain/chat/entities/unreadMessage.entity";

/**
 * Query to fetch all unread messages for a specific user.
 * Follows the CQRS principle: a query only retrieves data, no state change.
 */
export async function getUnreadMessagesQuery(receiverId: string): Promise<UnreadMessage[]> {
  const repository = new ChatRepository();
  const messages = await repository.getUnreadMessages(receiverId);

  // Transform raw messages into entity form
  const counts: Record<string, number> = {};
  messages.forEach((msg) => {
    counts[msg.sender_id] = (counts[msg.sender_id] || 0) + 1;
  });

  return Object.entries(counts).map(([senderId, count]) => ({
    senderId,
    receiverId,
    count,
  }));
}
