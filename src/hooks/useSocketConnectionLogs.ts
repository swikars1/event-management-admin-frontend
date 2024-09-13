import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";

export const useSocketConnectionLogs = () => {
  const [socketed, setSocketed] = useState(false);

  useEffect(() => {
    function onConnect() {
      setSocketed(true);
    }

    function onDisconnect() {
      setSocketed(false);
    }

    function onConnectError(error: any) {
      if (socket.active) {
        console.log(error.message, "active");
      } else {
        console.log(error.message, "inactive");
      }
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
    };
  }, []);
};
