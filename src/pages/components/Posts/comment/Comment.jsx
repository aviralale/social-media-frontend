import { Heart } from "lucide-react";
import CommentHeader from "./CommentHeader";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Replies } from "./reply/Replies";
import { apiURL } from "@/utils/apiUrl";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { axiosInstance } from "@/auth/auth";
import { toast } from "sonner";
import { FavouriteIcon } from "@/Icons/Icons";
import { getMediaUrl } from "@/utils/getMediaUrl";

export default function Comment({
  post,
  author,
  content,
  created_at,
  like_count,
  reply_count,
  id,
  fetchComments,
  is_liked,
  postAuthor,
}) {
  const [reply, setReply] = useState("");
  const [commentData, setCommentData] = useState(null);
  const [isLiked, setIsLiked] = useState(is_liked);
  const [likeCount, setLikeCount] = useState(like_count);
  const [loadingButton, setLoadingButton] = useState(false);

  const fetchCommentData = async () => {
    try {
      const response = await axiosInstance.get(`/api/comments/${id}`);
      setCommentData(response.data);
      setIsLiked(response.data.is_liked);
      setLikeCount(response.data.like_count);
    } catch (err) {
      console.error("Error fetching comment data", err);
      toast.error("Failed to fetch comment data");
    }
  };

  useEffect(() => {
    if (!commentData) {
      fetchCommentData();
    }
  }, [id]);

  const handleLikeAction = async () => {
    if (loadingButton) return;
    setLoadingButton(true);

    try {
      const newIsLiked = !isLiked;
      setIsLiked(newIsLiked);
      setLikeCount((prevCount) => (newIsLiked ? prevCount + 1 : prevCount - 1));

      const response = await axiosInstance.post(`/api/comments/${id}/like/`);

      if (response.data.is_liked !== newIsLiked) {
        fetchCommentData();
      }

      toast.success(newIsLiked ? "Comment Liked" : "Comment Unliked");
    } catch (err) {
      console.error("Error handling like action", err);
      toast.error("Failed to update like status");
      setIsLiked(!isLiked);
      setLikeCount((prevCount) => (isLiked ? prevCount + 1 : prevCount - 1));
    } finally {
      setLoadingButton(false);
    }
  };

  const handleReply = async () => {
    if (!reply.trim()) {
      toast.error("Reply cannot be empty");
      return;
    }

    const data = {
      content: reply,
      comment: id,
    };

    try {
      await axiosInstance.post(`${apiURL}/api/replies/`, data);
      await fetchComments();
      setReply("");
      toast.success("Reply posted successfully.");
    } catch (err) {
      console.error("Error posting reply:", err);
      toast.error("Failed to post reply");
    }
  };

  const memoizedCommentData = useMemo(
    () => ({
      ...commentData,
      is_liked: isLiked,
      like_count: likeCount,
    }),
    [commentData, isLiked, likeCount]
  );

  return (
    <>
      <div>
        <CommentHeader
          profilePicture={`${getMediaUrl(author.profile_pic)}`}
          username={author.username}
          isVerified={author.is_verified}
          firstName={author.first_name}
          lastName={author.last_name}
          createdAt={created_at}
          followingCount={author.following_count}
          followerCount={author.follower_count}
        />
        <div className="flex flex-col ml-6 justify-between items-center w-[26rem]">
          <div className="flex flex-row items-center w-full justify-between">
            <p className="text-sm text-wrap">{content}</p>
            <div className="flex items-center">
              <button className="mr-1" onClick={handleLikeAction}>
                <FavouriteIcon
                  width={12}
                  height={12}
                  fill={isLiked ? "red" : "none"}
                />
              </button>
              <Link
                className="text-xs hover:underline"
                to={`/post/${post}/comment/${id}/likers`}
              >
                {likeCount}
              </Link>
            </div>
          </div>
          <div className="flex">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  View {reply_count} {reply_count < 2 ? "reply" : "replies"}
                </AccordionTrigger>
                <AccordionContent>
                  <Replies commentId={id} />
                  <div className="flex flex-col">
                    <Textarea
                      className="mt-2"
                      placeholder="Add a reply..."
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                    />
                    <Button variant="ghost" onClick={handleReply}>
                      Reply
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}
