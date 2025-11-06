// Interface for representing a message
export interface Message {
  id: string;  // Unique identifier for the message
  sender_id: string;  // Sender of the message
  receiver_id: string;  // Receiver of the message
  message: string;  // The content of the message
  created_at: string;  // Date and time when the message was created
  is_read: boolean;  // Indicates if the message has been read
}

// Define the message structure (different from the previous message interface)
export interface UserMessage {
  id: string;  // Unique identifier for the message
  sender_id: string;  // Sender's unique identifier
  receiver_id: string;  // Receiver's unique identifier
  message: string;  // The content of the message
}