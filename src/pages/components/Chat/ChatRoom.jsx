import React, { useState, useEffect, useRef } from "react";
import { getMediaUrl } from "@/utils/getMediaUrl";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { axiosInstance, getToken, getUsername } from "@/auth/auth";
import formatDate from "@/utils/formatDate";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { websocketURL } from "@/utils/apiUrl";

function ChatRoom({ chatId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [otherUser, setOtherUser] = useState(null);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const scrollAreaRef = useRef(null);
  const username = getUsername();
  const ws = useRef(null);

  const fetchMessages = async () => {
    try {
      const response = await axiosInstance.get(`room/${chatId}/`);
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
    const socketUrl = `${websocketURL}chat/${chatId}/?token=${token}`;

    ws.current = new WebSocket(socketUrl);

    ws.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.message) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
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

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
      // Attempt to reconnect after a delay
      setTimeout(connectWebSocket, 5000);
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
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify(messageData));
      }
      fetchMessages();
      setNewMessage("");
      setIsTyping(false);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleTyping = (e) => {
    if (!isTyping) {
      setIsTyping(true);
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify({ is_typing: true }));
      }
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className="h-[calc(100vh-2rem)] min-w-[70vw]">
      <CardHeader className="p-2 border-b-2">
        <CardTitle className="flex justify-center items-center ">
          <Avatar className="mr-2">
            {otherUser && otherUser.profile_pic ? (
              <AvatarImage
                src={getMediaUrl(otherUser.profile_pic)}
                alt={otherUser.username}
                className="aspect-square object-cover"
              />
            ) : (
              <AvatarFallback>
                {otherUser && otherUser.username
                  ? otherUser.username.substring(0, 2).toUpperCase()
                  : "UN"}
              </AvatarFallback>
            )}
          </Avatar>{" "}
          {otherUser ? otherUser.username : "Loading..."}
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-hidden flex-grow">
        <ScrollArea ref={scrollAreaRef} className="h-[80vh] overflow-y-auto">
          {messages.length !== 0 ? (
            messages.map((message) => (
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
            ))
          ) : (
            <div className="flex items-center justify-center h-[80vh]">
              <h1>No messages. Start chat with {otherUser?.username}</h1>
            </div>
          )}
          {otherUserTyping && (
            <div
              className={`relative group w-full text-left rounded px-2 py-1 border-l-4 border-blue-300`}
            >
              <Button
                variant="none"
                className="w-full text-left flex flex-col items-start justify-center"
              >
                <p className="text-xs text-gray-500">
                  {otherUser ? otherUser.username : "Other user"}
                </p>
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
