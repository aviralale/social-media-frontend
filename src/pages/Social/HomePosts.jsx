import { axiosInstance } from "@/auth/auth";
import { apiURL } from "@/utils/apiUrl";
import { useEffect, useState } from "react";
import Post from "../components/Posts/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Loader from "../components/Misc/Loader";
import FeedEnd from "../components/Misc/FeedEnd";

export default function HomePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const isDashboard = false;

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${apiURL}/api/home/posts/?page=${page}`
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
          {posts.map((post) => (
            <div key={post.id} className="w-full p-2">
              <Post {...post} isDashboard={isDashboard} />
            </div>
          ))}
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
