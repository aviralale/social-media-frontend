import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/auth/auth";

function StartChat({ onNewChat }) {
  const [username, setUsername] = useState("");

  const handleStartChat = async () => {
    try {
      const response = await axiosInstance.get(`/api/start/${username}/`);
      onNewChat(response.data);
      setUsername("");
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Start a New Chat</h2>
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
