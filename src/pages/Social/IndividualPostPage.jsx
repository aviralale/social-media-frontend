import PostMedia from "../components/Posts/PostMedia";
// import postData from "@/data/postData";
import PostFooter from "../components/Posts/PostFooter";
import PostHeader from "../components/Posts/PostHeader";
import { Comments } from "../components/Posts/comment/Comments";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiURL } from "@/utils/apiUrl";
import { axiosInstance } from "@/auth/auth";

export default function IndividualPostPage() {
  const { username, postId } = useParams();
  const [postData, setPostData] = useState(null);
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axiosInstance.get(
          `${apiURL}/api/users/${username}/posts/${postId}/`
        );
        setPostData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPostData();
  }, [username, postId]);
  if (!postData) {
    return <h1>Loading...!</h1>;
  }
  return (
    <>
      <div className="border p-3 rounded-md h-full">
        <div className="flex gap-8">
          <div>
            <PostHeader
              username={postData.author.username}
              isVerified={postData.author.is_verified}
              followerCount={postData.author.follower_count}
              followingCount={postData.author.following_count}
              firstName={postData.author.first_name}
              lastName={postData.author.last_name}
              profilePicture={postData.author.profile_pic}
              postPosted={postData.created_at}
            />
            <PostMedia
              media={postData.media}
              caption={postData.content}
              postPosted={postData.created_at}
              commentCount={postData.comment_count}
            />
            <PostFooter
              likeCount={postData.like_count}
              postId={postData.id}
              username={postData.author.username}
            />
          </div>
          <Comments />
        </div>
      </div>
    </>
  );
}
