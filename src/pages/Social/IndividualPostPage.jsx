import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import PostMedia from "../components/Posts/PostMedia";
import PostFooter from "../components/Posts/PostFooter";
import PostHeader from "../components/Posts/PostHeader";
import { Comments } from "../components/Posts/comment/Comments";
import { apiURL } from "@/utils/apiUrl";
import { axiosInstance } from "@/auth/auth";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function IndividualPostPage() {
  const { username, postId } = useParams();
  const [postData, setPostData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loadingButton, setLoadingButton] = useState(false);

  const fetchPostData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `${apiURL}/api/users/${username}/posts/${postId}/`
      );
      setPostData(response.data);
      setIsLiked(response.data.is_liked);
      setLikeCount(response.data.like_count);
    } catch (err) {
      console.error("Error fetching post data:", err);
      toast.error("Failed to load post data");
    }
  }, [username, postId]);

  useEffect(() => {
    fetchPostData();
  }, [fetchPostData]);

  const handleLikeAction = async () => {
    if (loadingButton) return;
    setLoadingButton(true);

    try {
      const newIsLiked = !isLiked;
      setIsLiked(newIsLiked);
      setLikeCount((prevCount) => (newIsLiked ? prevCount + 1 : prevCount - 1));

      const response = await axiosInstance.post(
        `${apiURL}/api/posts/${postId}/like/`
      );

      if (response.data.is_liked !== newIsLiked) {
        fetchPostData();
      }

      toast.success(newIsLiked ? "Post Liked" : "Post Unliked");
    } catch (err) {
      console.error("Error handling like action:", err);
      toast.error("Failed to update like status");
      setIsLiked(!isLiked);
      setLikeCount((prevCount) => (isLiked ? prevCount + 1 : prevCount - 1));
    } finally {
      setLoadingButton(false);
    }
  };

  if (!postData) {
    return (
      <div className="border p-3 mt-3 rounded-md h-full">
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-96 w-full mb-4" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="border p-3 mt-3 rounded-md min-w-[76vw] h-full">
      <div className="flex gap-8">
        <div className="flex-grow max-w-2/3">
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
          <PostMedia
            isIndividualPage
            media={postData.media}
            caption={postData.content}
            postPosted={postData.created_at}
            commentCount={postData.comment_count}
          />
          <PostFooter
            likeCount={likeCount}
            postId={postData.id}
            username={postData.author.username}
            isLiked={isLiked}
            handleLikeAction={handleLikeAction}
            loadingButton={loadingButton}
          />
        </div>
        <div className="max-w-1/3">
          <Comments postId={postId} postAuthor={postData.author.username} />
        </div>
      </div>
    </div>
  );
}
