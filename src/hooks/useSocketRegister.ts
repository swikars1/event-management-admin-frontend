import { socket } from "@/lib/socket";
import { useEffect } from "react";

export const useSocketRegister = () => {
  useEffect(() => {
    socket.emit("register", { registered: true });
    return () => {
      socket.off("register");
    };
  }, []);
};
