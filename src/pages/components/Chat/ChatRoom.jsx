import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance, getToken, getUsername } from "@/auth/auth";
import formatDate from "@/utils/formatDate";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

function ChatRoom({ chatId }) {
  // const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [otherUser, setOtherUser] = useState(null);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const ws = useRef(null);
  const scrollAreaRef = useRef(null);
  const username = getUsername();

  const fetchMessages = async () => {
    try {
      const response = await axiosInstance.get(`/api/room/${chatId}/`);
      setMessages(response.data.messages);
      setOtherUser(response.data.other_user);
      setOtherUserTyping(response.data.other_user_typing);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [chatId]);

  const connectWebSocket = () => {
    const token = getToken();
    ws.current = new WebSocket(
      `ws://127.0.0.1:8000/ws/chat/${chatId}/?token=${token}`
    );

    ws.current.onopen = () => {
      console.log("WebSocket connection established.");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.message) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length,
            sender: data.sender,
            content: data.message,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
      if (data.is_typing !== undefined) {
        setOtherUserTyping(data.is_typing);
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [chatId]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    const messageData = {
      message: newMessage,
      is_typing: false,
      sender: username,
    };

    try {
      await axiosInstance.post(`/api/room/${chatId}/`, { content: newMessage });
      ws.current.send(JSON.stringify(messageData));
      setNewMessage("");
      setIsTyping(false);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleTyping = (e) => {
    if (!isTyping) {
      setIsTyping(true);
      ws.current.send(JSON.stringify({ is_typing: true }));
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return (
    <Card className="h-[calc(100vh-2rem)] min-w-[70vw]">
      <CardHeader>
        <CardTitle>{otherUser}</CardTitle>
      </CardHeader>
      <CardContent className="overflow-hidden flex-grow">
        <ScrollArea ref={scrollAreaRef} className="h-[48rem] overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className="mb-2 flex items-center">
              <div
                className={`relative group w-full text-left rounded px-2 py-1 border-l-4 ${
                  message.sender === username
                    ? "border-red-700"
                    : "border-blue-300"
                }`}
              >
                <Button
                  variant="none"
                  className="w-full text-left flex flex-col items-start justify-center"
                >
                  <p className="text-xs text-gray-500">{message.sender}</p>
                  {message.content}
                </Button>
                {message.timestamp && (
                  <Badge className="absolute right-0 top-[50%] text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10">
                    {formatDate(message.timestamp)}
                  </Badge>
                )}
              </div>
            </div>
          ))}
          {otherUserTyping && (
            <div
              className={`relative group w-full text-left rounded px-2 py-1 border-l-4 border-blue-300`}
            >
              <Button
                variant="none"
                className="w-full text-left flex flex-col items-start justify-center"
              >
                <p className="text-xs text-gray-500">{otherUser}</p>
                is typing...
              </Button>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleTyping}
          placeholder="Type a message..."
          className="flex-grow mr-2"
        />
        <Button onClick={sendMessage}>Send</Button>
      </CardFooter>
    </Card>
  );
}

export default ChatRoom;
