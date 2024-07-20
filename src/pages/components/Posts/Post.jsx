import React from "react";
import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";
import PostFooter from "./PostFooter";

export default function Post({
  id,
  author,
  created_at,
  media,
  content,
  isDashboard,
  comment_count,
  like_count,
}) {
  return (
    <>
      <div className="flex flex-col border p-2 rounded-lg">
        <div className="postHeader">
          <PostHeader
            username={author.username}
            isVerified={author.is_verified}
            followerCount={author.follower_count}
            followingCount={author.following_count}
            firstName={author.first_name}
            lastName={author.last_name}
            profilePicture={author.profile_pic}
            postPosted={created_at}
          />
        </div>
        <div className="postBody">
          <PostMedia
            media={media}
            caption={content}
            postPosted={created_at}
            isDashboard={isDashboard}
          />
        </div>
        <div className="postFooter">
          <PostFooter
            isDashboard={isDashboard}
            commentCount={comment_count}
            likeCount={like_count}
            postId={id}
            username={author.username}
          />
        </div>
      </div>
    </>
  );
}
