import { useEffect, useState, useRef } from "react";
import socket from "@/lib/socket/client";
import { ChatMessage } from "@/server/shared/types/chat.types";
import styles from "@/src/styles/components/counter.module.scss";

interface UnreadCountMap {
  [senderId: string]: number;
}

const NewMessageCounter = () => {
  const [currentUserId, setCurrentUserId] = useState<string | null>("123"); // TODO: Replace with real auth
  const [unreadCounts, setUnreadCounts] = useState<UnreadCountMap>({});
  const [senderNames, setSenderNames] = useState<Record<string, string>>({}); // State for sender names
  const idToNameMap = useRef<Record<string, string>>({}); // Cache: senderId => senderName

  // Fetch initial unread messages from Neon DB
  const fetchUnreadMessages = async () => {
    if (!currentUserId) return;

    const res = await fetch(`/api/messages?receiverId=${currentUserId}&unread=true`);
    const messages: ChatMessage[] = await res.json();

    const counts: UnreadCountMap = {};
    messages.forEach((msg) => {
      counts[msg.sender_id] = (counts[msg.sender_id] || 0) + 1;
    });

    setUnreadCounts(counts);
  };

  // Fetch sender names in parallel
  const fetchSenderNames = async () => {
    const entries = Object.keys(unreadCounts);
    if (entries.length === 0) return;

    const fetchPromises = entries.map(async (senderId) => {
      if (idToNameMap.current[senderId]) {
        return [senderId, idToNameMap.current[senderId]] as [string, string];
      }
      const res = await fetch(`/api/users?userId=${senderId}`);
      const data = await res.json();
      const name = data?.name || `Unbekannt (${senderId})`;
      idToNameMap.current[senderId] = name;
      return [senderId, name] as [string, string];
    });

    const results = await Promise.all(fetchPromises);
    const newNames: Record<string, string> = {};
    results.forEach(([id, name]) => {
      newNames[id] = name;
    });

    setSenderNames(newNames);
  };

// Socket listener & fetch sender names
  useEffect(() => {
    if (!Object.keys(unreadCounts).length) return;

    (async () => {
      const entries = Object.keys(unreadCounts);
      const fetchPromises = entries.map(async (senderId) => {
        if (idToNameMap.current[senderId]) {
          return [senderId, idToNameMap.current[senderId]] as [string, string];
        }
        const res = await fetch(`/api/users?userId=${senderId}`);
        const data = await res.json();
        const name = data?.name || `Unbekannt (${senderId})`;
        idToNameMap.current[senderId] = name;
        return [senderId, name] as [string, string];
      });

      const results = await Promise.all(fetchPromises);
      const newNames: Record<string, string> = {};
        results.forEach(([id, name]) => {
        newNames[id] = name;
      });

      setSenderNames(newNames);
    })();
  }, [unreadCounts]);


  // Mark messages as read
  const markAsRead = async (senderId: string) => {
    if (!currentUserId) return;

    await fetch(`/api/messages/mark-read`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senderId, receiverId: currentUserId }),
    });

    setUnreadCounts((prev) => {
      const updated = { ...prev };
      delete updated[senderId];
      return updated;
    });
  };

  return (
    <div className={styles.messageCounterContainer}>
      <h1 className={styles.counterTitle}>Nachrichten</h1>
      <div className={styles.counterContainer}>
        {Object.keys(unreadCounts).length === 0 ? (
          <p className={styles.counterMessage}>Keine neuen Nachrichten.</p>
        ) : (
          <ul>
            {Object.entries(unreadCounts).map(([senderId, count]) => (
              <li className={styles.counterMessage} key={senderId}>
                {senderNames[senderId] || `User (${senderId})`}: {count} neue Nachricht
                {count !== 1 ? "en" : ""}
                <button
                  className={styles.markAsReadButton}
                  onClick={() => markAsRead(senderId)}
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
