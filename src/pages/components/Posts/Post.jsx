import React, { useState, useEffect, useMemo } from "react";
import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";
import PostFooter from "./PostFooter";
import { axiosInstance } from "@/auth/auth";
import { apiURL } from "@/utils/apiUrl";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function Post({
  id,
  author,
  created_at,
  media,
  content,
  isDashboard,
  comment_count,
  like_count,
  is_liked,
}) {
  const [postData, setPostData] = useState(null);
  const [isLiked, setIsLiked] = useState(is_liked);
  const [likeCount, setLikeCount] = useState(like_count);
  const [loadingButton, setLoadingButton] = useState(false);

  const fetchPostData = async () => {
    try {
      const response = await axiosInstance.get(`posts/${id}`);
      setPostData(response.data);
      setIsLiked(response.data.is_liked);
      setLikeCount(response.data.like_count);
    } catch (err) {
      console.error("Error fetching post data", err);
      toast.error("Failed to fetch post data");
    }
  };

  useEffect(() => {
    if (!postData) {
      fetchPostData();
    }
  }, [id]);

  const handleLikeAction = async () => {
    if (loadingButton) return;
    setLoadingButton(true);

    try {
      const newIsLiked = !isLiked;
      setIsLiked(newIsLiked);
      setLikeCount((prevCount) => (newIsLiked ? prevCount + 1 : prevCount - 1));

      const response = await axiosInstance.post(`posts/${id}/like/`);

      if (response.data.is_liked !== newIsLiked) {
        fetchPostData();
      }

      toast.success(newIsLiked ? "Post Liked" : "Post Unliked");
    } catch (err) {
      console.error("Error handling like action", err);
      toast.error("Failed to update like status");
      setIsLiked(!isLiked);
      setLikeCount((prevCount) => (isLiked ? prevCount + 1 : prevCount - 1));
    } finally {
      setLoadingButton(false);
    }
  };

  const memoizedPostData = useMemo(
    () => ({
      ...postData,
      is_liked: isLiked,
      like_count: likeCount,
    }),
    [postData, isLiked, likeCount]
  );

  if (!postData) {
    return (
      <div className="flex flex-col space-y-3 bordered border-gray-500 p-4 rounded-lg">
        <div className="flex">
          <Skeleton className="h-8 w-8 rounded-full mr-2"></Skeleton>
          <div className="space-y-2">
            <Skeleton className="h-2 min-w-[250px]" />
            <Skeleton className="h-2 w-[200px]" />
          </div>
        </div>
        <Skeleton className="h-96 min-w-96 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-2 min-w-[250px]" />
          <Skeleton className="h-1 w-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col border p-2 rounded-lg">
      <div className="postHeader">
        <PostHeader
          username={author.username}
          postId={id}
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
          postId={id}
          username={author.username}
          media={media}
          caption={content}
          postPosted={created_at}
          commentCount={comment_count}
          isDashboard={isDashboard}
        />
      </div>
      <div className="postFooter">
        <PostFooter
          isDashboard={isDashboard}
          commentCount={comment_count}
          likeCount={likeCount}
          postId={id}
          username={author.username}
          isLiked={isLiked}
          handleLikeAction={handleLikeAction}
          loadingButton={loadingButton}
        />
      </div>
    </div>
  );
}
