import { NextResponse } from "next/server";
import { Server as SocketIOServer, Socket } from "socket.io";
import type { Server as HTTPServer } from "http";
import { ChatService } from "@/server/modules/chat/chat.service";

// Typ für das Datenobjekt beim Senden einer Nachricht
interface SendMessageData {
  sender_id: string;
  receiver_id: string;
  message: string;
}

// Typ für das Datenobjekt beim Markieren als gelesen
interface MarkReadData {
  sender_id: string;
  receiver_id: string;
}

export const GET = async () => {
  const res = NextResponse.next();

  // Typisierung von NextResponse.socket
  const httpServer = (res as unknown as { socket?: { server: HTTPServer & { io?: SocketIOServer } } })
    .socket?.server;

  if (!httpServer) {
    console.error("HTTP server not found!");
    return res;
  }

  if (!httpServer.io) {
    console.log("🔌 Initializing Socket.io...");

    const io = new SocketIOServer(httpServer, {
      path: "/api/socket",
      cors: { origin: "*" },
    });

    const chatService = new ChatService();

    io.on("connection", (socket: Socket) => {
      console.log("🟢 User connected:", socket.id);

      socket.on("join_room", (userId: string) => {
        socket.join(userId);
      });

      socket.on("send_message", async (data: SendMessageData) => {
        const saved = await chatService.sendMessage(data.sender_id, data.receiver_id, data.message);
        io.to(data.receiver_id).emit("receive_message", saved);
        io.to(data.sender_id).emit("receive_message", saved);
      });

      socket.on("mark_read", async (data: MarkReadData) => {
        await chatService.markConversationAsRead(data.sender_id, data.receiver_id);
      });

      socket.on("disconnect", () => {
        console.log("🔴 User disconnected:", socket.id);
      });
    });

    httpServer.io = io;
  } else {
    console.log("♻️ Socket.io already running.");
  }

  return res;
};
