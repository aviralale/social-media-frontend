import { apiURL } from "@/utils/apiUrl";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Follower from "../components/User/Follower";
import { axiosInstance } from "@/auth/auth";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/Misc/Loader";

export default function Following() {
  const { username } = useParams();
  const [following, setFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchFollowing(1);
  }, [username]);

  const fetchFollowing = async (page) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(
        `users/${username}/following/?page=${page}`
      );
      if (page === 1) {
        setFollowing(response.data.results);
      } else {
        setFollowing((prevFollowing) => [
          ...prevFollowing,
          ...response.data.results,
        ]);
      }
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch following list");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMoreData = () => {
    if (currentPage < totalPages) {
      fetchFollowing(currentPage + 1);
    }
  };

  if (isLoading && currentPage === 1)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="text-5xl text-center mt-4 yatra-one-regular">Following</h1>
      <InfiniteScroll
        dataLength={following.length}
        next={fetchMoreData}
        hasMore={currentPage < totalPages}
        loader={
          <div className="w-full flex justify-center">
            <Loader />
          </div>
        }
        endMessage={<p className="text-center">Yay! You have seen it all</p>}
      >
        <div className="min-h-[90vh]">
          {following.length > 0 ? (
            following.map((follow) => (
              <div key={follow.id}>
                <Follower {...follow} />
              </div>
            ))
          ) : (
            <p className="text-center">Not following anyone yet.</p>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
}
