export interface ChatUser {
  id: string;
  name: string;
  email: string;
}

export interface ChatMessage {
  id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export interface CreateMessageDTO {
  sender_id: string;
  receiver_id: string;
  message: string;
}
