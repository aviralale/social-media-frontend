import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getMediaUrl } from "@/utils/getMediaUrl";
import { getUsername } from "@/auth/auth";
import { CheckmarkCircle02Icon } from "@/Icons/Icons";

function ChatList({ chats, setSelectedChatId }) {
  const username = getUsername();

  return (
    <div className="p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-2">Your Chats</h2>
      {Array.isArray(chats) && chats.length > 0 ? (
        chats.map((chat) => (
          <Button
            key={chat.id}
            className="flex justify-start text-left mb-2 p-2"
            onClick={() => setSelectedChatId(chat.id)}
            variant="none"
          >
            <Avatar className="mr-2">
              {chat.other_user && chat.other_user.profile_pic ? (
                <AvatarImage
                  src={getMediaUrl(chat.other_user.profile_pic)}
                  alt={chat.other_user.username}
                  className="aspect-square object-cover"
                />
              ) : (
                <AvatarFallback>
                  {chat.other_user && chat.other_user.username
                    ? chat.other_user.username.substring(0, 2).toUpperCase()
                    : "UN"}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col">
              <span>
                {chat.other_user && typeof chat.other_user.username === "string"
                  ? chat.other_user.username
                  : "Unknown User"}
              </span>
              <span className="text-xs flex gap-2 items-center">
                {chat.last_message &&
                chat.last_message.sender &&
                chat.last_message.sender.username
                  ? chat.last_message.sender.username === username
                    ? "You: "
                    : `${chat.last_message.sender.username}: `
                  : ""}
                {chat.last_message && chat.last_message.content
                  ? chat.last_message.content
                  : "Start chatting!"}
                {chat.last_message && chat.last_message.is_delivered && (
                  <CheckmarkCircle02Icon
                    width={14}
                    height={14}
                    fill={chat.last_message.is_seen ? "white" : "black"}
                  />
                )}
              </span>
            </div>
          </Button>
        ))
      ) : (
        <p>No chats available</p>
      )}
    </div>
  );
}

export default ChatList;
