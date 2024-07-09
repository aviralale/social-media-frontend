import { apiURL } from "@/utils/apiUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Follower from "../components/User/Follower";

export default function Followers() {
  const { username } = useParams();
  const [followers, setFollowers] = useState([]);
  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(
          `${apiURL}/api/users/${username}/followers/`
        );
        setFollowers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFollowers();
  }, [username]);

  return (
    <div>
      <h1>Followers</h1>
      <div>
        {followers.map((follower) => (
          <div key={follower.id}>
            <Follower {...follower} />
          </div>
        ))}
      </div>
    </div>
  );
}
