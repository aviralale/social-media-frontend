import PostMedia from "../components/Posts/PostMedia";
import postData from "@/data/postData";
import PostFooter from "../components/Posts/PostFooter";
import PostHeader from "../components/Posts/PostHeader";
import { Comments } from "../components/Posts/comment/Comments";

export default function IndividualPostPage(props) {
  return (
    <>
      <div className="border p-3 rounded-md h-full">
        <div className="flex gap-8">
          <div>
            <PostHeader
              username={postData[0].author.username}
              isVerified={postData[0].author.is_verified}
              followerCount={postData[0].author.follower_count}
              followingCount={postData[0].author.following_count}
              firstName={postData[0].author.first_name}
              lastName={postData[0].author.last_name}
              profilePicture={postData[0].author.profile_pic}
              postPosted={postData[0].created_at}
            />
            <PostMedia
              media={postData[0].media}
              caption={postData[0].content}
              postPosted={postData[0].created_at}
              commentCount={postData[0].comment_count}
            />
            <PostFooter likeCount={postData[0].like_count} />
          </div>
          <Comments />
        </div>
      </div>
    </>
  );
}
