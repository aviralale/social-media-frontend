import React, { createContext, useState, useContext, useCallback } from "react";
import { axiosInstance } from "@/auth/auth";
import { apiURL } from "@/utils/apiUrl";

const PostContext = createContext();

export const usePosts = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPosts = useCallback(async (page = 1) => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(`home/posts/?page=${page}`);
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
      console.error("Error fetching posts: ", error);
    }
    setLoading(false);
  }, []);

  const fetchMoreData = () => {
    setTimeout(() => {
      if (currentPage < totalPages) {
        fetchPosts(currentPage + 1);
      }
    }, 800);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        fetchPosts,
        fetchMoreData,
        currentPage,
        totalPages,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
