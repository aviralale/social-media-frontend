import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { axiosInstance } from "@/auth/auth";

function ChatList() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axiosInstance.get("/api/chats/");
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    fetchChats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Chats</h1>
      {chats.map((chat) => (
        <Link to={`/inbox/${chat.id}`} key={chat.id}>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>{chat.other_user.username}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{chat.last_message?.content || "No messages yet"}</p>
              {chat.other_user_typing && (
                <p className="text-sm text-gray-500">Typing...</p>
              )}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default ChatList;
