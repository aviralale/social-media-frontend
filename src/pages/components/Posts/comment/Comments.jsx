import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Comment from "./Comment";
import { Fragment, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiURL } from "@/utils/apiUrl";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/auth/auth";
import { toast } from "sonner";

export function Comments(props) {
  const { postId } = useParams();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${apiURL}posts/${postId}/comments/`);
      setComments(response.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
      toast.error("Failed to load comments");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleComment = async () => {
    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    const data = {
      post: postId,
      content: comment,
    };

    try {
      await axiosInstance.post(`comments/`, data);
      await fetchComments();
      setComment("");
      toast.success("Comment posted successfully.");
    } catch (err) {
      console.error("Error posting comment:", err);
      toast.error("Failed to post comment");
    }
  };

  const handleKeyDown = useCallback(
    (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleComment();
      }
    },
    [handleComment]
  );

  return (
    <div className="flex flex-col justify-between border rounded-md min-w-96">
      <ScrollArea className="h-[48rem]">
        <div className="p-4">
          <h4 className="mb-4 text-md font-medium leading-none">Comments</h4>
          {comments.map((comment) => (
            <Fragment key={comment.id}>
              <Comment
                {...comment}
                postId={postId}
                fetchComments={fetchComments}
                postAuthor={props.postAuthor}
              />
              <Separator className="my-2" />
            </Fragment>
          ))}
        </div>
      </ScrollArea>
      <div className="flex flex-col p-4">
        <Textarea
          placeholder="Enter a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <p className="text-xs">
          Press <b>Ctrl+Enter</b> to submit comments.
        </p>
        <Button onClick={handleComment} className="mt-2">
          Comment
        </Button>
      </div>
    </div>
  );
}
