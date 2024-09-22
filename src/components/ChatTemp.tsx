"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FormEvent, useEffect, useRef, useState } from "react";
import { socket } from "@/lib/socket";
import { useSocketConnect } from "@/hooks/useSocketConnect";
import { useSocketConnectionLogs } from "@/hooks/useSocketConnectionLogs";
import { useSocketRegister } from "@/hooks/useSocketRegister";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/API";

type OnlineUser = { id: string; email: string; role: "ADMIN" | "USER" };

interface ChatHistoryMessage {
  id: string;
  chatId: string;
  senderId: string;
  message: string;
  createdAt: string;
  sender: {
    id: string;
    email: string;
    role: "ADMIN" | "USER";
  };
}

interface UserChat {
  id: string;
  email: string;
  lastMessage: string | null;
  lastMessageTime: string | null;
}

export function ChatTemp() {
  const [messages, setMessages] = useState<
    { id: string; message: string; isUser: boolean; createdAt: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const { data: userChats, isLoading: isLoadingUserChats } = useQuery({
    queryKey: ["adminUserChats"],
    queryFn: async () => {
      const response = await API.get("/chat/admin/user-chats");
      return response.data.responseObject as UserChat[];
    },
  });

  const { data: chatHistory, isLoading: isLoadingChatHistory } = useQuery({
    queryKey: ["chatHistory", selectedUserId],
    queryFn: async () => {
      if (!selectedUserId) return;
      const response = await API.get(`/chat/${selectedUserId}/history`);
      return response.data.responseObject as ChatHistoryMessage[];
    },
    enabled: !!selectedUserId,
  });

  console.log({ userChats, chatHistory });

  useSocketConnect();
  useSocketConnectionLogs();
  useSocketRegister();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    function onOnlineUsers(users: OnlineUser[]) {
      setOnlineUsers(users);
    }

    function onReceiveMessage(data: { senderId: string; message: string }) {
      if (data.senderId === selectedUserId) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: Date.now().toString(),
            message: data.message,
            isUser: true,
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    }

    socket.on("online_users", onOnlineUsers);
    socket.on("receive_message", onReceiveMessage);

    return () => {
      socket.off("online_users", onOnlineUsers);
      socket.off("receive_message", onReceiveMessage);
    };
  }, [selectedUserId]);

  const onlineUsersOnly = onlineUsers.filter((user) => user.role !== "ADMIN");

  useEffect(() => {
    if (chatHistory) {
      setMessages(
        chatHistory.map((msg) => ({
          id: msg.id,
          message: msg.message,
          createdAt: msg.createdAt,
          isUser: msg.sender.role !== "ADMIN", // Use the sender's role to determine if it's a user message
        }))
      );
    }
  }, [chatHistory]);

  function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    socket.emit("send_message_from_admin", {
      message: input,
      recipientId: selectedUserId,
    });
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now().toString(),
        message: input,
        isUser: false,
        createdAt: new Date().toISOString(),
      },
    ]);

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
            {isLoadingUserChats ? (
              <div className="p-4">Loading conversations...</div>
            ) : (
              userChats?.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedUserId(chat.id)}
                  className={`flex items-center gap-4 px-4 py-3 hover:bg-muted transition-colors ${
                    selectedUserId === chat.id ? "bg-muted" : ""
                  }`}
                >
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage src="/placeholder-user.jpg" alt={chat.email} />
                    <AvatarFallback>
                      {chat.email.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{chat.email}</div>
                    <div className="text-sm text-muted-foreground">
                      {chat.lastMessage
                        ? `${chat.lastMessage.substring(0, 20)}...`
                        : "No messages yet"}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="bg-background rounded-lg shadow-sm">
          <div className="border-b px-4 py-3 font-semibold">
            {selectedUserId
              ? `Chat with ${
                  userChats?.find((chat) => chat.id === selectedUserId)?.email
                }`
              : "Select a conversation"}
          </div>
          <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
            {isLoadingChatHistory ? (
              <div>Loading chat history...</div>
            ) : (
              messages.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-start gap-4 ${
                    item.isUser ? "justify-end" : ""
                  }`}
                >
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage
                      src="/placeholder-user.jpg"
                      alt={item.isUser ? "User" : "Admin"}
                    />
                    <AvatarFallback>{item.isUser ? "U" : "A"}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 grid gap-1">
                    <div className="font-medium">
                      {item.isUser ? "User" : "Admin"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.message}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(item.createdAt).toLocaleTimeString()}
                      {/* Display actual message time */}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          {selectedUserId && (
            <form onSubmit={sendMessage} className="p-4 border-t">
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
          )}
        </div>
      </main>
    </div>
  );
}
