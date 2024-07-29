import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "@/auth/auth";
import { toast } from "sonner";
import { usePosts } from "@/context/PostContext";
import { useParams } from "react-router-dom";

const EditPost = (props) => {
  const [content, setContent] = useState(props.caption);
  const { fetchPosts } = usePosts();
  const { postId } = useParams();

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.setProgress(10);

    try {
      await axiosInstance.patch(
        `posts/${postId}/`,
        { content: content },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setContent("");
      props.setProgress(100);
      toast.success("Posted successfully.");
      fetchPosts();
    } catch (error) {
      props.setProgress(0);
      toast.error("There was an error creating the post!");
      console.error("There was an error creating the post!", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-2xl mx-auto p-4 shadow-lg rounded-lg"
    >
      <Textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={handleContentChange}
        className="w-full p-3 border rounded-lg"
      />

      <Button type="submit" className="w-full py-2">
        Edit Post
      </Button>
    </form>
  );
};

export default EditPost;
