import React from "react";
import { Button } from "@/components/ui/button";

function ChatList({ chats, setSelectedChatId }) {
  console.log("Chats in ChatList:", chats);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Your Chats</h2>
      {Array.isArray(chats) ? (
        chats.map((chat) => (
          <Button
            key={chat.id}
            className="w-full text-left mb-2"
            onClick={() => setSelectedChatId(chat.id)}
          >
            {typeof chat.username === "string" ? chat.username : "Unknown User"}
          </Button>
        ))
      ) : (
        <p>No chats available</p>
      )}
    </div>
  );
}

export default ChatList;
