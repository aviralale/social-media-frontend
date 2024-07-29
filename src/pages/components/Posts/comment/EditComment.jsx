import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "@/auth/auth";
import { toast } from "sonner";
import { usePosts } from "@/context/PostContext";
import { useParams } from "react-router-dom";

const EditComment = (props) => {
  const [content, setContent] = useState(props.caption);
  const { fetchPosts } = usePosts();
  const commentId = props.commentId;
  const { postId } = useParams();

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.patch(`comments/${commentId}/`, {
        post: postId,
        content: content,
      });
      setContent("");
      toast.success("Posted successfully.");
      props.fetchCommentData;
      fetchPosts();
    } catch (error) {
      toast.error("There was an error modifying the comment!");
      console.error("There was an error modifying the comment!", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-2xl mx-auto p-4 shadow-lg rounded-lg"
    >
      <Textarea
        placeholder="Edit comment..."
        value={content}
        onChange={handleContentChange}
        className="w-full p-3 border rounded-lg"
      />

      <Button type="submit" className="w-full py-2">
        Edit Comment
      </Button>
    </form>
  );
};

export default EditComment;
