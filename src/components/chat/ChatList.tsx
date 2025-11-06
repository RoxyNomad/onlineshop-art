import { ChatUser, ChatMessage } from "@/server/shared/types/chat.types";
import styles from "@/src/styles/modules/artists/messages.module.scss";

interface ChatListProps {
  users: ChatUser[];
  messages: ChatMessage[];
  currentUserId: string;
  selectedUser: ChatUser | null;
  onSelectUser: (user: ChatUser) => void;
}

export default function ChatList({ users, messages, currentUserId, selectedUser, onSelectUser }: ChatListProps) {
  const activeUsers = users.filter((user) =>
    messages.some(
      (msg) =>
        (msg.sender_id === currentUserId && msg.receiver_id === user.id) ||
        (msg.sender_id === user.id && msg.receiver_id === currentUserId)
    )
  );

  return (
    <div className={styles.messageList}>
      {activeUsers.map((user) => (
        <div
          key={user.id}
          className={`${styles.messageItem} ${selectedUser?.id === user.id ? styles.active : ""}`}
          onClick={() => onSelectUser(user)}
        >
          <p>{user.name}</p>
        </div>
      ))}
    </div>
  );
}
