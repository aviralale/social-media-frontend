import { apiURL } from "@/utils/apiUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Follower from "../components/User/Follower";

export default function Following() {
  const { username } = useParams();
  const [following, setFollowing] = useState([]);
  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await axios.get(
          `${apiURL}/api/users/${username}/following/`
        );
        setFollowing(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFollowing();
  }, [username]);

  return (
    <div>
      <h1>Following</h1>
      <div>
        {following.map((follow) => (
          <div key={follow.id}>
            <Follower {...follow} />
          </div>
        ))}
      </div>
    </div>
  );
}
