import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChatList from "../components/Chat/ChatList";
import ChatRoom from "../components/Chat/ChatRoom";
import StartChat from "../components/Chat/StartChat";
import { axiosInstance } from "@/auth/auth";

export default function ChatPage() {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const { chatId } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (chatId) {
      setSelectedChatId(parseInt(chatId));
    }
  }, [chatId]);

  const handleNewChat = (newChat) => {
    setChats([...chats, newChat]);
    navigate(`/inbox/${newChat.id}`);
  };

  const handleSelectChat = (chatId) => {
    navigate(`/inbox/${chatId}`);
  };

  return (
    <div className="flex w-[80vw] h-screen pt-4">
      <div className="w-1/4">
        <ChatList chats={chats} setSelectedChatId={handleSelectChat} />
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
