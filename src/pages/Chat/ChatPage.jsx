import ChatList from "../components/Chat/ChatList";
import ChatRoom from "../components/Chat/ChatRoom";
import StartChat from "../components/Chat/StartChat";
import { useState, useEffect } from "react";
import { axiosInstance } from "@/auth/auth";

export default function ChatPage() {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);

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

  const handleNewChat = (newChat) => {
    setChats([...chats, newChat]);
    setSelectedChatId(newChat.id);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r">
        <ChatList chats={chats} setSelectedChatId={setSelectedChatId} />
        <StartChat onNewChat={handleNewChat} />
      </div>
      <div className="w-3/4">
        {selectedChatId ? (
          <ChatRoom chatId={selectedChatId} />
        ) : (
          <p className="text-center mt-10">Select a chat or start a new one</p>
        )}
      </div>
    </div>
  );
}
