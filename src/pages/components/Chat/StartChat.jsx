import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/auth/auth";

function StartChat() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleStartChat = async () => {
    try {
      const response = await axiosInstance.get(`/api/start/${username}/`);
      navigate(`/chat/${response.data.room_id}`);
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Start a New Chat</h1>
      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        className="mb-2"
      />
      <Button onClick={handleStartChat}>Start Chat</Button>
    </div>
  );
}

export default StartChat;
