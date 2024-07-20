import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { BadgeCheck } from "lucide-react";
import { apiURL } from "@/utils/apiUrl";

export default function CommmentLiker({
  username,
  profile_pic,
  is_verified,
  following_count,
  follower_count,
}) {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Link
            className="flex items-center gap-2 mb-2 hover:underline"
            to={`/vs/${username}`}
          >
            <Avatar className="w-8 h-8">
              <AvatarImage
                className="object-cover aspect-square"
                src={`${apiURL}${profile_pic}`}
              />
              <AvatarFallback>AH</AvatarFallback>
            </Avatar>
            @{username} {is_verified ? <BadgeCheck size={16} /> : ""}
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="max-w-80 flex">
          <div className="flex justify-between space-x-4">
            <Avatar>
              <AvatarImage
                className="object-cover aspect-square"
                src={`${apiURL}${profile_pic}`}
              />
              <AvatarFallback>AH</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold flex gap-1 items-center ">
                @{username}
                {is_verified ? <BadgeCheck size={16} /> : ""}
              </h4>
              <span to="#" className=" text-sm">
                <span className="font-bold">{following_count} </span>
                following
              </span>
              {"\t"}
              <span to="#" className=" text-sm">
                <span className="font-bold">{follower_count} </span>
                {follower_count < 2 ? "follower" : "followers"}
              </span>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}
