import React from "react";
import Post from "./Post";

export default function Posts() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl yatra-one-regular">Posts</h1>
        <div className="flex flex-col">
          <Post />
        </div>
      </div>
    </>
  );
}
