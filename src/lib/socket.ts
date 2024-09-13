import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://localhost:8080';

export const socket = io(URL, {
  transports: ['websocket', 'polling'],
  auth: (cb) => {
    if (typeof window !== "undefined") {
      cb({
        token: localStorage.getItem("token") || "",
      });
    }
  }
});