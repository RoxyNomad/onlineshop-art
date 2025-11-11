export interface ChatMessage {
  id: string;
  senderId: string;
	receiverId: string;
  message: string;
  timestamp: string;
}

export interface ChatUser {
  id: string;
  name: string;
}
