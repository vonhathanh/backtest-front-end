import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import config from "../config";

export default function useSocketIO() {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(function setupSocketio() {
    const sio = io(config.socketioURL, {
      transports: ["websocket"],
      withCredentials: false,
      reconnection: false,
    });

    setSocket(sio);

    sio.on("connect", () => {
      console.log("connected to server, clientId: ", sio.id);
      setIsConnected(true);
    });

    sio.on("disconnect", () => {
      console.log("disconnected from server");
      setIsConnected(false);
    });

    return () => sio.close();
  }, []);

  return { socket, isConnected };
}
