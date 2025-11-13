// socket/client.ts
import { io, Socket } from "socket.io-client";

const socket: Socket = io({
  path: "/api/socket",
  transports: ["websocket"],
  autoConnect: false,
});


export default socket;
