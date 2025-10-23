// utils/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_BASE_URL!, {
      transports: ["websocket"],
    });
  }
  return socket;
};
