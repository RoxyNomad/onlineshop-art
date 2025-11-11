import { ChatUser, ChatMessage } from "@/domain/chat/entities/chat.entity";

/**
 * Returns the list of users that have exchanged messages with currentUserId
 */
export async function fetchActiveUsers(currentUserId: string, messages: ChatMessage[], allUsers: ChatUser[]): Promise<ChatUser[]> {
  // Filter users that have at least one message exchanged with current user
  return allUsers.filter((user) =>
    messages.some(
      (msg) =>
        (msg.senderId === currentUserId && msg.receiverId === user.id) ||
        (msg.senderId === user.id && msg.receiverId === currentUserId)
    )
  );
}
