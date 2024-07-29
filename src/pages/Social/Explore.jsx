import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { axiosInstance } from "@/auth/auth";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import Loader from "../components/Misc/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import useDocumentTitle from "@/utils/useDocumentTitle";

const ExplorePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useDocumentTitle("Explore");

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`explore/?page=${page}`);
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
    } catch (error) {
      console.error("Error fetching explore posts:", error);
      toast.error("Failed to load explore posts");
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
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl yatra-one-regular font-bold mb-6">Explore</h1>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={currentPage < totalPages}
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
            <Link
              to={`/vs/${post.author.username}/posts/${post.id}`}
              key={post.id}
              className="mb-4 rounded-lg break-inside-avoid"
            >
              <div className="rounded-lg mb-4 border border-gray-400 shadow-md overflow-hidden">
                {post.media && post.media.length > 0 && (
                  <img
                    src={post.media[0].file}
                    alt="Post media"
                    className="w-full h-auto object-cover"
                  />
                )}
                <div className="p-4">
                  <p className="">{post.content}</p>
                  <div className="mt-2 flex items-center text-sm ">
                    <img
                      src={post.author.profile_pic}
                      alt={post.author.username}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span>{post.author.username}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
};

export default ExplorePage;
