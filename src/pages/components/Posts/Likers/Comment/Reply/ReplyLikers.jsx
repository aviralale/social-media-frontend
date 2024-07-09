import { apiURL } from "@/utils/apiUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReplyLiker from "./ReplyLiker";

export default function ReplyLikers() {
  const { replyid } = useParams();
  const [likers, setLikers] = useState([]);
  useEffect(() => {
    const fetchReplyLikers = async () => {
      try {
        const response = await axios.get(
          `${apiURL}/api/replies/${replyid}/likers/`
        );
        setLikers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReplyLikers();
  }, [likers]);
  return (
    <div>
      <h1 className="text-xl text-center my-5">Liked by:</h1>
      {likers.map((liker) => (
        <div key={liker.id}>
          <ReplyLiker {...liker} />
        </div>
      ))}
    </div>
  );
}
