import React, { useEffect, useState } from "react";
import Post from "./Post";
import { apiURL } from "@/utils/apiUrl";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "@/auth/auth";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Misc/Loader";
import FeedEnd from "../Misc/FeedEnd";

export default function Posts(props) {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `users/${username}/posts/?page=${page}`
      );
      if (page === 1) {
        setPosts(response.data.results);
      } else {
        setPosts((prevPosts) => {
          const newPosts = response.data.results.filter(
            (newPost) =>
              !prevPosts.some((existingPost) => existingPost.id === newPost.id)
          );
          return [...prevPosts, ...newPosts];
        });
      }
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.total_pages);
      console.log(posts);
    } catch (error) {
      console.log("Error fetching posts: ", error);
    }
    setLoading(false);
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      if (currentPage < totalPages) {
        fetchPosts(currentPage + 1);
      }
    }, 800);
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <h1 className="text-5xl yatra-one-regular mb-5 text-center">Posts</h1>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={currentPage < totalPages}
        endMessage={<FeedEnd />}
        loader={
          <div className="w-full flex justify-center">
            <Loader />
          </div>
        }
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {posts.map((post) => (
            <div key={post.id} className="mb-4">
              <Post {...post} isDashboard={props.isDashboard} />
            </div>
          ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
}
