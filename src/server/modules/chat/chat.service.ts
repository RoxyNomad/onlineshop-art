// server/modules/chat/chat.service.ts
import { ChatRepository } from "./chat.repository";

export class ChatService {
  private repo = new ChatRepository();

  async sendMessage(senderId: string, receiverId: string, message: string) {
    return this.repo.saveMessage(senderId, receiverId, message);
  }

  async getConversation(userId: string, contactId: string) {
    return this.repo.getMessagesBetween(userId, contactId);
  }

  async markConversationAsRead(senderId: string, receiverId: string) {
    await this.repo.markAsRead(senderId, receiverId);
  }
}
