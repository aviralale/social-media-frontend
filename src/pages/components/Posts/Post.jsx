import React from "react";
import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";
import postData from "../../../data/postData";
import PostFooter from "./PostFooter";

export default function Post(props) {
  return (
    <>
      <div className="flex flex-col border p-2 rounded-lg">
        <div className="postHeader">
          <PostHeader
            username={postData.author.username}
            isVerified={postData.author.is_verified}
            followerCount={postData.author.follower_count}
            followingCount={postData.author.following_count}
            firstName={postData.author.first_name}
            lastName={postData.author.last_name}
            profilePicture={postData.author.profile_pic}
            postPosted={postData.created_at}
          />
        </div>
        <div className="postBody">
          <PostMedia
            media={postData.media}
            caption={postData.content}
            postPosted={postData.created_at}
            isDashboard={props.isDashboard}
          />
        </div>
        <div className="postFooter">
          <PostFooter
            isDashboard={props.isDashboard}
            commentCount={postData.comment_count}
            likeCount={postData.like_count}
          />
        </div>
      </div>
    </>
  );
}
