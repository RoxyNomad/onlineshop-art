import { useState, useEffect } from "react";
import socket from "@/lib/socket/client";
import { ChatMessage, ChatUser } from "@/server/shared/types/chat.types";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";
import styles from "@/src/styles/artists/messages.module.scss";

const Chat = () => {
  const userId = "123"; // TODO: Auth später
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);

  // Join WebSocket room
  useEffect(() => {
    if (!userId) return;
    socket.emit("join_room", userId);
  }, [userId]);

  // Empfange Nachrichten in Echtzeit
  useEffect(() => {
    socket.on("receive_message", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off("receive_message");
    };
  }, []);

  // Users + Messages initial laden (REST-Fallback)
  useEffect(() => {
    (async () => {
      const [usersRes, messagesRes] = await Promise.all([
        fetch("/api/users"),
        fetch(`/api/messages?userId=${userId}`),
      ]);
      setUsers(await usersRes.json());
      setMessages(await messagesRes.json());
    })();
  }, []);

  // Nachricht senden (via Socket)
  const handleSendMessage = (text: string) => {
    if (!selectedUser || !text.trim()) return;
    const newMsg = { sender_id: userId, receiver_id: selectedUser.id, message: text };
    socket.emit("send_message", newMsg);
  };

  // Aktive Chatnachrichten
  const activeChatMessages = selectedUser
    ? messages.filter(
        (m) =>
          (m.sender_id === userId && m.receiver_id === selectedUser.id) ||
          (m.sender_id === selectedUser.id && m.receiver_id === userId)
      )
    : [];

  return (
    <div className={styles.messageContainer}>
      <ChatList
        users={users}
        messages={messages}
        currentUserId={userId}
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
      />
      {selectedUser && (
        <ChatWindow chatUser={selectedUser} messages={activeChatMessages} currentUserId={userId} onClose={() => setSelectedUser(null)}>
          <MessageInput onSend={handleSendMessage} />
        </ChatWindow>
      )}
    </div>
  );
};

export default Chat;
