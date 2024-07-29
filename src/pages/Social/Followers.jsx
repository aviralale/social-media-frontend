import { apiURL } from "@/utils/apiUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Follower from "../components/User/Follower";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/Misc/Loader";

export default function Followers() {
  const { username } = useParams();
  const [followers, setFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchFollowers(1);
  }, [username]);

  const fetchFollowers = async (page) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${apiURL}users/${username}/followers/?page=${page}`
      );
      if (page === 1) {
        setFollowers(response.data.results);
      } else {
        setFollowers((prevFollowers) => [
          ...prevFollowers,
          ...response.data.results,
        ]);
      }
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch followers list");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMoreData = () => {
    if (currentPage < totalPages) {
      fetchFollowers(currentPage + 1);
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
      <h1 className="text-5xl text-center mt-4 yatra-one-regular">Followers</h1>
      <InfiniteScroll
        dataLength={followers.length}
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
          {followers.length > 0 ? (
            followers.map((follower) => (
              <div key={follower.id}>
                <Follower {...follower} />
              </div>
            ))
          ) : (
            <p className="text-center">No followers yet.</p>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
}
