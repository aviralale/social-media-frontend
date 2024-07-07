import { Heart } from "lucide-react";
import CommentHeader from "./ReplyHeader";
import { Link } from "react-router-dom";

export default function Reply({ author, content, created_at, like_count }) {
  return (
    <>
      <div>
        <CommentHeader
          profilePicture={author.profile_pic}
          username={author.username}
          isVerified={author.is_verified}
          firstName={author.first_name}
          lastName={author.last_name}
          createdAt={created_at}
          followingCount={author.following_count}
          followerCount={author.follower_count}
        />
        <div className="flex ml-6 justify-between items-center max-w-[29rem]">
          <p className="text-sm text-wrap">{content}</p>
          <div className="flex items-center justify-center">
            <button className="mr-1">
              <Heart size={12} />
            </button>
            <Link className="text-xs hover:underline">{like_count}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
