import { Link } from "react-router-dom";
import { apiURL } from "@/utils/apiUrl";
import { useEffect, useState } from "react";
import { axiosInstance, getUsername } from "@/auth/auth";
import { toast } from "sonner";
import { Delete02Icon, FavouriteIcon, PencilEdit02Icon } from "@/Icons/Icons";
import ReplyHeader from "./ReplyHeader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditReply from "./EditReply";
import { Button } from "@/components/ui/button";

export default function Reply({
  author,
  content,
  created_at,
  like_count,
  is_liked,
  comment,
  id,
  commentId,
  fetchReplies,
}) {
  const [replyData, setReplyData] = useState(null);
  const [isLiked, setIsLiked] = useState(is_liked);
  const [likeCount, setLikeCount] = useState(like_count);
  const [loadingButton, setLoadingButton] = useState(false);
  const username = getUsername();
  const fetchReplyData = async () => {
    try {
      const response = await axiosInstance.get(`/api/replies/${id}`);
      setReplyData(response.data);
      setIsLiked(response.data.is_liked);
      setLikeCount(response.data.like_count);
    } catch (err) {
      console.error("Error comment post data", err);
      toast.error("Failed to comment post data");
    }
  };

  useEffect(() => {
    if (!replyData) {
      fetchReplyData();
    }
  }, [id]);

  const handleLikeAction = async () => {
    if (loadingButton) return;
    setLoadingButton(true);

    try {
      const newIsLiked = !isLiked;
      setIsLiked(newIsLiked);
      setLikeCount((prevCount) => (newIsLiked ? prevCount + 1 : prevCount - 1));

      const response = await axiosInstance.post(`/api/replies/${id}/like/`);

      if (response.data.is_liked !== newIsLiked) {
        fetchReplyData();
      }
      toast.success(newIsLiked ? "Reply liked" : "Comment unliked");
    } catch (err) {
      console.log("Error handling like action", err);
      toast.error("Failed to like reply");
      setIsLiked(!isLiked);
      setLikeCount((prevCount) => (isLiked ? prevCount + 1 : prevCount - 1));
    } finally {
      setLoadingButton(false);
    }
  };

  const handleDeleteReply = async () => {
    try {
      await axiosInstance.delete(`/api/replies/${id}/`);
      await props.fetchReplies();
      toast.success("Comment deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete comment");
    }
  };

  return (
    <>
      <div>
        <ReplyHeader
          profilePicture={`${apiURL}${author.profile_pic}`}
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
            <div className="flex">
              <Dialog>
                {username === author.username ? (
                  <DialogTrigger className="flex items-center gap-2 transition-all ease duration-200 p-2 rounded-xl hover:bg-zinc-900 ">
                    <PencilEdit02Icon width={14} height={14} />
                  </DialogTrigger>
                ) : (
                  <></>
                )}

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="yatra-one-regular">
                      Edit Comment
                    </DialogTitle>
                    <EditReply
                      commentId={commentId}
                      replyId={id}
                      fetchReply={fetchReplies}
                      caption={content}
                    />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Dialog>
                {username === author.username ? (
                  <DialogTrigger className="flex items-center gap-2 transition-all ease duration-200 p-2 rounded-xl hover:bg-zinc-900 ">
                    <Delete02Icon width={14} height={14} />
                  </DialogTrigger>
                ) : (
                  <></>
                )}

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="yatra-one-regular">
                      Delete Comment?
                    </DialogTitle>
                    <p>Do you want to delete your comment "{content}"?</p>
                  </DialogHeader>
                  <Button variant="destructive" onClick={handleDeleteReply}>
                    Delete
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
            <button className="mr-1" onClick={handleLikeAction}>
              <FavouriteIcon
                width={12}
                height={12}
                fill={isLiked ? "red" : "none"}
              />
            </button>
            <Link
              className="text-xs hover:underline"
              to={`/comment/${comment}/reply/${id}/likers`}
            >
              {likeCount}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
