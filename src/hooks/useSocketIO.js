import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import config from "../config";

export default function useSocketIO() {
  //   const [socket, setSocket] = useState(null);

  const socket = io(config.socketioURL, {
    transports: ["websocket"],
    withCredentials: false,
  });

  //   useEffect(() => {
  //     console.log("useEffect");
  //     const sio = io(config.socketioURL, {
  //       transports: ["websocket"],
  //       withCredentials: false,
  //     });
  //     setSocket(sio);

  //     return () => sio.close();
  //   }, []);

  return socket;
}
