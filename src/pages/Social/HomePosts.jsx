import React, { useEffect } from "react";
import { usePosts } from "@/context/PostContext";
import Post from "../components/Posts/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/Misc/Loader";
import FeedEnd from "../components/Misc/FeedEnd";

export default function HomePosts() {
  const { posts, loading, fetchPosts, fetchMoreData, currentPage, totalPages } =
    usePosts();
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="flex flex-col justify-center items-center w-full mb-5">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={currentPage < totalPages}
        loader={
          <div className="w-full flex justify-center">
            <Loader />
          </div>
        }
        endMessage={<FeedEnd />}
      >
        <div className="flex flex-col justify-center align-center w-full">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="w-full p-2">
                <Post {...post} />
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </InfiniteScroll>
      {loading && (
        <div className="w-full h-screen flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
