import { socket } from "@/lib/socket";
import { useEffect } from "react";

export const useSocketConnect = () => {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);
};
