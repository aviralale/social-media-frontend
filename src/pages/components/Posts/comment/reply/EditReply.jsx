import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "@/auth/auth";
import { toast } from "sonner";
import { usePosts } from "@/context/PostContext";

const EditReply = (props) => {
  const [content, setContent] = useState(props.caption);
  const { fetchPosts } = usePosts();
  const replyId = props.replyId;
  const { commentId } = props.commentId;

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.patch(`replies/${replyId}/`, {
        comment: commentId,
        content: content,
      });
      setContent("");
      toast.success("Posted successfully.");
      props.fetchReplyData;
      fetchPosts();
    } catch (error) {
      toast.error("There was an error modifying the reply!");
      console.error("There was an error modifying the reply!", error);
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
        Edit Reply
      </Button>
    </form>
  );
};

export default EditReply;
