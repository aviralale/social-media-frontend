import { apiURL } from "@/utils/apiUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentLiker from "./CommentLiker";

export default function CommentLikers() {
  const { commentid } = useParams();
  const [likers, setLikers] = useState([]);
  useEffect(() => {
    const fetchCommentLikers = async () => {
      try {
        const response = await axios.get(
          `${apiURL}/api/comments/${commentid}/likers/`
        );
        setLikers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCommentLikers();
  }, [likers]);
  return (
    <div>
      <h1 className="text-xl text-center my-5">Liked by:</h1>
      {likers.map((liker) => (
        <div key={liker.id}>
          <CommentLiker {...liker} />
        </div>
      ))}
    </div>
  );
}
