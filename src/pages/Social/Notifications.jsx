import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { axiosInstance, getToken, getUsername } from "@/auth/auth";
import { getMediaUrl } from "@/utils/getMediaUrl";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { websocketURL } from "@/utils/apiUrl";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const token = getToken();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get("/api/notifications/");
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();

    // WebSocket setup
    const socket = new WebSocket(
      `${websocketURL}notifications/?token=${token}`
    );

    socket.onopen = () => {
      console.log("Notification WebSocket connection established");
    };

    socket.onmessage = (event) => {
      console.log("Received WebSocket message:", event.data);
      const receivedData = JSON.parse(event.data);
      const newNotification = receivedData.message; // Extract the nested message object
      setNotifications((prevNotifications) => [
        newNotification,
        ...prevNotifications,
      ]);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleNotificationClick = async (notification) => {
    if (!notification.is_read) {
      try {
        await axiosInstance.patch(`/api/notifications/${notification.id}/`, {
          is_read: true,
        });
        setNotifications((prevNotifications) =>
          prevNotifications.map((notif) =>
            notif.id === notification.id ? { ...notif, is_read: true } : notif
          )
        );
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await axiosInstance.post(`/api/notifications/mark-all-as-read/`);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) => ({ ...notif, is_read: true }))
      );
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const getNotificationMessage = (notification) => {
    switch (notification.notification_type) {
      case "like":
        return `liked your post.`;
      case "comment":
        return `commented on your post.`;
      case "follow":
        return `started following you.`;
      default:
        return `interacted with you.`;
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Notifications</CardTitle>
        <Button onClick={handleMarkAllAsRead}>Mark All as Read</Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          {notifications.map((notification, index) => (
            <Link
              onClick={() => handleNotificationClick(notification)}
              to={
                notification.notification_type === "follow"
                  ? `/vs/${notification.sender.username}`
                  : notification.notification_type === "like" ||
                    notification.notification_type === "comment"
                  ? `/vs/${getUsername()}/posts/${notification.post}`
                  : ""
              }
              key={index}
              className={`flex items-center justify-between space-x-4 mb-4`}
            >
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage
                    src={getMediaUrl(notification.sender?.profile_pic)}
                    alt={notification.sender?.username}
                    className="aspect-square object-cover"
                  />
                  <AvatarFallback>
                    {notification.sender?.username[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    <span className="font-bold">
                      {notification.sender?.username}
                    </span>{" "}
                    {getNotificationMessage(notification)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(notification?.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              {notification.is_read ? <></> : <Badge>Unread</Badge>}
            </Link>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Notifications;
