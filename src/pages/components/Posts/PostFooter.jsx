import { Button } from "@/components/ui/button";
import { Comment01Icon, FavouriteIcon } from "@/Icons/Icons";
import { MessageCircle, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function PostFooter(props) {
  return props.isDashboard ? (
    <div className="flex items-center w-full gap-4 ml-2 my-2 border-t border-gray-500/50">
      <div className="hover:underline p-0 flex items-center gap-1">
        <Button variant="link" className="p-2 m-0">
          <FavouriteIcon className="transform scale-x-[-1]" />
        </Button>
        <Link to={`/vs/${props.username}/posts/${props.postId}/likers`}>
          <span>{props.likeCount}</span>
        </Link>
      </div>
      <span className="no-underline p-0 flex items-center gap-1">
        <Comment01Icon className="transform m-2 scale-x-[-1]" />
        {props.commentCount}
      </span>
    </div>
  ) : (
    <div className="flex items-baseline w-full gap-4 ml-2 my-2 pt-2 border-t border-gray-500/50">
      <div className="hover:underline p-0 flex items-center gap-1">
        <Button variant="link" className="p-2 m-0">
          <FavouriteIcon className="transform scale-x-[-1]" />
        </Button>
        <Link to={`/vs/${props.username}/posts/${props.postId}/likers`}>
          <span>{props.likeCount}</span>
        </Link>
      </div>
    </div>
  );
}
