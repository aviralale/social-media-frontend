import { axiosInstance } from "@/auth/auth";
import { apiURL } from "@/utils/apiUrl";
import { useEffect, useState } from "react";
import Post from "../components/Posts/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Loader from "../components/Misc/Loader";

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
    setInterval(() => {
      if (currentPage < totalPages) {
      }
    }, 800);
    fetchPosts(currentPage + 1);
  };

  return (
    <>
      {loading && posts.length === 0 && <Loader />}
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={currentPage < totalPages}
        loader={<Loader />}
      >
        <div className="flex flex-col justify-center align-center">
          {posts.map((post) => (
            <div key={post.id} className="w-full  p-2">
              <Link to={`/vs/${post.author.username}/posts/${post.id}`}>
                <Post {...post} isDashboard={isDashboard} />
              </Link>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}
