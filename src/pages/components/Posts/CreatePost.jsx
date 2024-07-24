import React, { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "@/auth/auth";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { usePosts } from "@/context/PostContext";

const MAX_MEDIA = 10;

const CreatePost = (props) => {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState([]);
  const { fetchPosts } = usePosts();

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setMedia((prevMedia) => {
      const newMedia = [...prevMedia, ...acceptedFiles];
      return newMedia.slice(0, MAX_MEDIA);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "video/*": [],
    },
    multiple: true,
    disabled: media.length >= MAX_MEDIA,
  });

  const handleRemoveFile = (index) => {
    setMedia((prevMedia) => prevMedia.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.setProgress(10);
    const formData = new FormData();
    formData.append("content", content);
    media.forEach((file) => {
      formData.append("media", file);
    });

    try {
      await axiosInstance.post("/api/posts/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setContent("");
      setMedia([]);
      props.setProgress(100);
      toast.success("Posted successfully.");
      fetchPosts();
    } catch (error) {
      toast.error("There was an error creating the post!");
      console.error("There was an error creating the post!", error);
    }
  };

  useEffect(() => {
    if (media.length >= MAX_MEDIA) {
      toast.info(`You can only upload up to ${MAX_MEDIA} media files.`);
    }
  }, [media]);

  const renderMediaPreview = (file, index) => {
    if (file.type.startsWith("image/")) {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt={`Preview ${index}`}
          className="object-cover w-full h-full"
        />
      );
    } else if (file.type.startsWith("video/")) {
      return (
        <video
          src={URL.createObjectURL(file)}
          className="object-cover w-full h-full"
          autoPlay
        />
      );
    }
    return null;
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
      <div
        {...getRootProps()}
        className={`p-4 border-2 border-dashed rounded-lg ${
          isDragActive ? "border-blue-500" : "border-gray-300"
        } ${media.length >= MAX_MEDIA ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <Input {...getInputProps()} />
        {media.length >= MAX_MEDIA ? (
          <p className="text-center text-red-500">
            Maximum number of files reached
          </p>
        ) : isDragActive ? (
          <p className="text-center text-blue-500">Drop the files here ...</p>
        ) : (
          <p className="text-center text-gray-500">
            Drag 'n' drop some files here, or click to select files (max 10
            photos/videos)
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-4">
        {media.map((file, index) => (
          <div
            key={index}
            className="relative w-32 h-32 overflow-hidden border rounded-lg group"
          >
            {renderMediaPreview(file, index)}
            <button
              type="button"
              onClick={() => handleRemoveFile(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <Button type="submit" className="w-full py-2">
        Post
      </Button>
    </form>
  );
};

export default CreatePost;
