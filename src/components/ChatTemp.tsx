"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FormEvent, useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { useSocketConnect } from "@/hooks/useSocketConnect";
import { useSocketConnectionLogs } from "@/hooks/useSocketConnectionLogs";
import { useSocketRegister } from "@/hooks/useSocketRegister";

export function ChatTemp() {
  const [messages, setMessages] = useState<{ id: string; message: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  useSocketConnect();
  useSocketConnectionLogs();
  useSocketRegister();

  // useEffect(() => {
  //   function onMsg(message: {}) {
  //     setMessages(messages.concat(message));
  //   }

  //   socket.on("msg_received", onMsg);

  //   return () => {
  //     socket.off("msg_received", onMsg);
  //   };
  // }, [messages]);

  useEffect(() => {
    function onMsg(data) {
      setMessages([
        ...messages,
        { id: Date.now().toString(), message: data.message },
      ]);
      console.log("send_msg_to_admin", data);
    }
    socket.on("send_msg_to_admin", onMsg);

    return () => {
      socket.off("send_msg_to_admin", onMsg);
    };
  }, [messages]);

  function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    socket.emit("msg_sent_from_admin", { message: input });
    setMessages([...messages, { id: Date.now().toString(), message: input }]);

    setInput("");
  }

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Link
          href="#"
          className="flex items-center gap-2"
          prefetch={false}
        ></Link>
      </header>
      <main className="flex-1 grid grid-cols-[300px_1fr] gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="bg-background rounded-lg shadow-sm">
          <div className="border-b px-4 py-3 font-semibold">Conversations</div>
          <div className="divide-y">
            <Link
              href="#"
              className="flex items-center gap-4 px-4 py-3 hover:bg-muted transition-colors"
              prefetch={false}
            >
              <Avatar className="w-10 h-10 border">
                <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">John Doe</div>
                <div className="text-sm text-muted-foreground">
                  Booking for wedding event
                </div>
              </div>
              <div className="text-xs text-muted-foreground">2h</div>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-4 py-3 hover:bg-muted transition-colors"
              prefetch={false}
            >
              <Avatar className="w-10 h-10 border">
                <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                <AvatarFallback>JA</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">Jane Appleseed</div>
                <div className="text-sm text-muted-foreground">
                  Booking for corporate event
                </div>
              </div>
              <div className="text-xs text-muted-foreground">1d</div>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-4 py-3 hover:bg-muted transition-colors"
              prefetch={false}
            >
              <Avatar className="w-10 h-10 border">
                <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">Sarah Musk</div>
                <div className="text-sm text-muted-foreground">
                  Booking for birthday party
                </div>
              </div>
              <div className="text-xs text-muted-foreground">3d</div>
            </Link>
          </div>
        </div>
        <div className="bg-background rounded-lg shadow-sm">
          <div className="border-b px-4 py-3 font-semibold">
            Booking for wedding event
          </div>
          <div className="p-4 space-y-4">
            {messages.map((item) => (
              <div key={item.id} className="flex items-start gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 grid gap-1">
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-muted-foreground">
                    {item.message}
                  </div>
                  <div className="text-xs text-muted-foreground">2h</div>
                </div>
              </div>
            ))}

            <form onSubmit={sendMessage}>
              <div className="flex items-center gap-2">
                <Input
                  value={input}
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg bg-muted px-4 py-2"
                  onChange={(e) => setInput(e.target.value)}
                />
                <Button type="submit">Send</Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

function BookAIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      <path d="m8 13 4-7 4 7" />
      <path d="M9.1 11h5.7" />
    </svg>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
