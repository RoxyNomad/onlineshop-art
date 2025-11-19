"use client";

import styles from "@/ui/styles/modules/artists/messages.module.scss";
import { ChatUser } from "@/domain/chat/entities/chat.entity";

interface ChatListProps {
  users: ChatUser[];
  selectedUser: ChatUser | null;
  onSelectUser: (user: ChatUser) => void;
}

export default function ChatList({ users, selectedUser, onSelectUser }: ChatListProps) {
  return (
    <div className={styles.messageList}>
      {users.map((user) => (
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
