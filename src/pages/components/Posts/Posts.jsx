import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import { apiURL } from "@/utils/apiUrl";
import { useParams } from "react-router-dom";

export default function Posts(props) {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${apiURL}/api/users/${username}/posts/`
        );
        setPosts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center w-[70vw] items-center">
        <h1 className="text-5xl yatra-one-regular">Posts</h1>
        <div className="flex flex-wrap mt-5">
          {posts.map((post) => (
            <div
              key={post.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-2"
            >
              <Post {...post} isDashboard={props.isDashboard} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
