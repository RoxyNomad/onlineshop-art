import { ChatMessage } from "@/infrastructure/shared/types/chat.types";

/**
 * Repository contract for all message-related data operations.
 * This defines WHAT operations can be done, but not HOW they are implemented.
 */
export interface IMessageRepository {
  getUnreadMessages(receiverId: string): Promise<ChatMessage[]>;
  getSenderName(userId: string): Promise<string>;
  markMessagesAsRead(senderId: string, receiverId: string): Promise<void>;
}
