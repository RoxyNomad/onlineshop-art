// Represents a lightweight view of unread messages per sender
export interface UnreadMessage {
  senderId: string;
  receiverId: string;
  senderName?: string;
  count: number;
}
