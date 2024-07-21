import { axiosInstance, getUsername } from "@/auth/auth";
import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getMediaUrl } from "@/utils/getMediaUrl";
import { useEffect, useState } from "react";
import MutualConnections from "../User/MutualConnections";

export default function SidebarRight({ first_name, profile_pic }) {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const username = getUsername();

  const fetchSuggestedUsers = async () => {
    try {
      const response = await axiosInstance.get("/api/suggested-users/");
      setSuggestedUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSuggestedUsers();
  }, []);

  return (
    <div className="flex flex-col justify-between min-h-[100vh]">
      <ul className="flex flex-col pr-16 mt-16">
        <li>
          <NavLink
            to={`/vs/${username}`}
            className={`flex gap-2 transition-all ease duration-200 p-2 pr-4 rounded-xl hover:bg-zinc-900 mb-4`}
          >
            <Avatar className="w-16 h-16">
              <AvatarImage
                src={getMediaUrl(profile_pic)}
                className="aspect-square object-cover"
              />
              <AvatarFallback>{username}</AvatarFallback>
            </Avatar>
            <span className="flex flex-col ">
              <h1 className="text-xl yatra-one-regular">{first_name}</h1>
              <p className="text-xs -mt-2">@{username}</p>
            </span>
          </NavLink>
        </li>
        <h2 className="mb-1">Suggested for you: </h2>
        {suggestedUsers.map((suggestedUser) => (
          <li key={suggestedUser.id}>
            <NavLink
              to={`/vs/${suggestedUser.username}`}
              className={`flex flex-col transition-all ease duration-200 p-2 rounded-xl hover:bg-zinc-900`}
            >
              <div className="flex gap-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={getMediaUrl(suggestedUser.profile_pic)}
                    className="aspect-square object-cover"
                  />
                  <AvatarFallback>{suggestedUser.username}</AvatarFallback>
                </Avatar>
                <span className="flex flex-col justify-center">
                  <h1 className="text-lg yatra-one-regular">
                    {suggestedUser.first_name}
                  </h1>
                  <p className="text-xs -mt-2">@{suggestedUser.username}</p>
                </span>
              </div>
              <span className="flex items-center ">
                <MutualConnections
                  username={suggestedUser.username}
                  pfpSize={6}
                  isText={false}
                  textSize="sm"
                />
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
