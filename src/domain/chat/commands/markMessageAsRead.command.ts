import { ChatRepository } from "@/infrastructure/repositories/chat.repository";

/**
 * Command to mark messages from a specific sender as read.
 * Commands always modify state.
 */
export async function markMessagesAsReadCommand(senderId: string, receiverId: string): Promise<void> {
  const repository = new ChatRepository();
  await repository.markMessagesAsRead(senderId, receiverId);
}
