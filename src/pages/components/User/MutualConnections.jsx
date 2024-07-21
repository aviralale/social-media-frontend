import useMutualConnections from "@/auth/useMutualConnections";
import React from "react";
import Loader from "../Misc/Loader";
import { getMediaUrl } from "@/utils/getMediaUrl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export default function MutualConnections(props) {
  const { mutualConnections, mutualConnectionsLength, loading, error } =
    useMutualConnections(props.username);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const maxDisplayed = 3;
  const displayedConnections = mutualConnections.slice(0, maxDisplayed);
  const additionalCount =
    mutualConnectionsLength > maxDisplayed
      ? mutualConnectionsLength - maxDisplayed
      : 0;

  return (
    <div className={`flex items-center gap-2 ${props.className}`}>
      <ul className="flex items-center">
        {mutualConnectionsLength > 0 && props.isText && (
          <h2
            className={`mr-4 ${
              props.textSize ? `text-${props.textSize}` : "font-bold"
            }`}
          >
            Followed by
          </h2>
        )}
        {displayedConnections.map((connection, index) => (
          <Link
            key={connection.id}
            to={`/vs/${connection.username}`}
            className="relative -ml-2 group"
            style={{ zIndex: index }}
          >
            <Avatar
              className={`w-${props.pfpSize} h-${props.pfpSize} relative transition-all duration-200 ease-in-out group-hover:z-10 group-hover:scale-110`}
            >
              <AvatarImage
                src={getMediaUrl(connection.profile_pic)}
                className="aspect-square object-cover"
              />
              <AvatarFallback>{connection.username}</AvatarFallback>
            </Avatar>
          </Link>
        ))}
        {additionalCount > 0 && (
          <Avatar
            className={`w-${props.pfpSize} h-${props.pfpSize} -ml-2 border border-gray-500`}
          >
            <AvatarFallback>+{additionalCount}</AvatarFallback>
          </Avatar>
        )}
      </ul>
    </div>
  );
}
