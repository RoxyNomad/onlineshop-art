"use client";
import { useEffect, useState, useRef } from "react";
import { getUnreadMessagesQuery } from "@/domain/chat/queries/getUnreadMessages.query";
import { getSenderNamesQuery } from "@/domain/chat/queries/getSenderNames.query";
import { markMessagesAsReadCommand } from "@/domain/chat/commands/markMessageAsRead.command";
import { UnreadMessage } from "@/domain/chat/entities/unreadMessage.entity";
import styles from "@/styles/components/counter.module.scss";

/**
 * UI component that displays unread messages count per sender.
 * Uses CQRS queries and commands from the Core layer.
 */
const NewMessageCounter = () => {
  const [currentUserId] = useState<string>("123"); // TODO: Replace with real auth
  const [unreadMessages, setUnreadMessages] = useState<UnreadMessage[]>([]);
  const [senderNames, setSenderNames] = useState<Record<string, string>>({});
  const nameCache = useRef<Record<string, string>>({});

  // Load unread messages
  useEffect(() => {
    async function loadUnreadMessages() {
      const data = await getUnreadMessagesQuery(currentUserId);
      setUnreadMessages(data);
    }
    loadUnreadMessages();
  }, [currentUserId]);

  // Load sender names
  useEffect(() => {
    async function loadNames() {
      const ids = unreadMessages.map((m) => m.senderId);
      if (ids.length === 0) return;
      const names = await getSenderNamesQuery(ids, nameCache.current);
      nameCache.current = { ...nameCache.current, ...names };
      setSenderNames(names);
    }
    loadNames();
  }, [unreadMessages]);

  // Handle mark as read
  const handleMarkAsRead = async (senderId: string) => {
    await markMessagesAsReadCommand(senderId, currentUserId);
    setUnreadMessages((prev) => prev.filter((m) => m.senderId !== senderId));
  };

  return (
    <div className={styles.messageCounterContainer}>
      <h1 className={styles.counterTitle}>Nachrichten</h1>
      <div className={styles.counterContainer}>
        {unreadMessages.length === 0 ? (
          <p className={styles.counterMessage}>Keine neuen Nachrichten.</p>
        ) : (
          <ul>
            {unreadMessages.map(({ senderId, count }) => (
              <li className={styles.counterMessage} key={senderId}>
                {senderNames[senderId] || `User (${senderId})`}: {count} neue Nachricht
                {count !== 1 ? "en" : ""}
                <button
                  className={styles.markAsReadButton}
                  onClick={() => handleMarkAsRead(senderId)}
                >
                  Als gelesen markieren
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NewMessageCounter;
