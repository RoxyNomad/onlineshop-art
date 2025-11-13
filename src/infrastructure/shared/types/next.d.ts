import type { Server as HTTPServer } from "http";
import type { Server as SocketIOServer } from "socket.io";

declare module "http" {
  interface Server {
    io?: SocketIOServer;
  }
}

declare module "net" {
  interface Socket {
    server: HTTPServer & { io?: SocketIOServer };
  }
}
