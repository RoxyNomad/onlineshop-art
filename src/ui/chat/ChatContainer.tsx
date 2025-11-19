"use client";

import { useState, useEffect } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";
import { ChatUser, ChatMessage } from "@/domain/chat/entities/chat.entity";
import { fetchUsersQuery } from "@/domain/chat/queries/getUsers.query";
import { fetchMessagesQuery } from "@/domain/chat/queries/getMessages.query";
import { sendMessageCommand } from "@/domain/chat/commands/sendMessage.command";
import socket from "@/infrastructure/providers/socket/client";
import styles from "@/ui/styles/artists/messages.module.scss";
import ChatListContainer from "./ChatListContainer";

interface ChatContainerProps {
  currentUserId: string;
}

export default function ChatContainer({ currentUserId }: ChatContainerProps) {
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);

  // Join WebSocket room
  useEffect(() => {
    if (!currentUserId) return;
    socket.emit("join_room", currentUserId);
  }, [currentUserId]);

  // Listen for incoming messages
  useEffect(() => {
    socket.on("receive_message", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off("receive_message");
  }, []);

  // Load initial data (users + messages)
  useEffect(() => {
    (async () => {
      try {
        const usersData = await fetchUsersQuery();
        const messagesData = await fetchMessagesQuery(currentUserId);
        setUsers(usersData);
        setMessages(messagesData);
      } catch (error) {
        console.error("Error loading chat data:", error);
      }
    })();
  }, [currentUserId]);

  // Handle sending a message
  const handleSendMessage = (text: string) => {
    if (!selectedUser || !text.trim()) return;
    const newMsg = sendMessageCommand(text, currentUserId, selectedUser.id);
  };

  const activeChatMessages = selectedUser
    ? messages.filter(
        (m) =>
          (m.senderId === currentUserId && m.receiverId === selectedUser.id) ||
          (m.senderId === selectedUser.id && m.receiverId === currentUserId)
      )
    : [];

  return (
    <div className={styles.messageContainer}>
      <ChatListContainer
        allUsers={users}
        messages={messages}
        currentUserId={currentUserId}
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
      />
      {selectedUser && (
        <ChatWindow
          chatUser={selectedUser}
          messages={activeChatMessages}
          currentUserId={currentUserId}
          onClose={() => setSelectedUser(null)}
        >
          <MessageInput onSend={handleSendMessage} />
        </ChatWindow>
      )}
    </div>
  );
}
