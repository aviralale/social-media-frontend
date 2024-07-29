import { apiURL } from "@/utils/apiUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentLiker from "./CommentLiker";
import { axiosInstance } from "@/auth/auth";

export default function CommentLikers() {
  const { commentId } = useParams();
  const [likers, setLikers] = useState([]);
  useEffect(() => {
    const fetchCommentLikers = async () => {
      try {
        const response = await axiosInstance.get(
          `comments/${commentId}/likers/`
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
