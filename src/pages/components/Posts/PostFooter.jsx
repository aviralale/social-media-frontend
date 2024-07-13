import { Button } from "@/components/ui/button";
import { MessageCircle, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function PostFooter(props) {
  return props.isDashboard ? (
    <div className="flex w-full gap-4 ml-2 my-2">
      <span className="no-underline p-0 flex gap-1">
        <Heart className="transform scale-x-[-1]" />
        {props.likeCount}
      </span>
      <span className="no-underline p-0 flex gap-1">
        <MessageCircle className="transform scale-x-[-1]" />
        {props.commentCount}
      </span>
    </div>
  ) : (
    <div className="flex items-baseline w-full gap-4 ml-2 my-2">
      <Link
        className="hover:underline p-0 flex gap-1"
        to={`/vs/${props.username}/posts/${props.postId}/likers`}
      >
        <Heart className="transform scale-x-[-1]" />
        {props.likeCount} likes
      </Link>
    </div>
  );
}
