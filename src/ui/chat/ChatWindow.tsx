"use client";

import { ReactNode } from "react";
import { ChatMessage, ChatUser } from "@/domain/chat/entities/chat.entity";
import styles from "@/styles/modules/artists/messages.module.scss";

interface ChatWindowProps {
  chatUser: ChatUser;
  messages: ChatMessage[];
  currentUserId: string;
  onClose: () => void;
  children: ReactNode; // z. B. MessageInput
}

export default function ChatWindow({
  chatUser,
  messages,
  currentUserId,
  onClose,
  children,
}: ChatWindowProps) {
  return (
    <div className={styles.overlayContainer}>
      <div className={styles.overlay}>
        <div className={styles.overlayContent}>
          <div className={styles.chatHeader}>
            <h2>Chat mit {chatUser.name}</h2>
            <button className={styles.chatButton} onClick={onClose}>×</button>
          </div>

          <div className={styles.chatMessages}>
            {messages.map((msg) => (
              <p key={msg.id}>
                <strong>{msg.senderId === currentUserId ? "Du" : chatUser.name}:</strong>{" "}
                {msg.message}
              </p>
            ))}
          </div>

          <div className={styles.chatFooter}>{children}</div>
        </div>
      </div>
    </div>
  );
}
