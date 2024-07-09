import { apiURL } from "@/utils/apiUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostLiker from "./PostLiker";

export default function PostLikers() {
  const { postid } = useParams();
  const [likers, setLikers] = useState([]);
  useEffect(() => {
    const fetchPostLikers = async () => {
      try {
        const response = await axios.get(
          `${apiURL}/api/posts/${postid}/likers/`
        );
        setLikers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPostLikers();
  }, [likers]);
  return (
    <div>
      <h1 className="text-xl text-center my-5">Liked by:</h1>
      {likers.map((liker) => (
        <div key={liker.id}>
          <PostLiker {...liker} />
        </div>
      ))}
    </div>
  );
}
