import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Posts from "../components/Posts/Posts";
import { Button } from "@/components/ui/button";
import EditProfile from "./EditProfile";
import { Share2, UserRoundMinus, UserRoundPlus } from "lucide-react";
import axios from "axios";
import { apiURL } from "@/utils/apiUrl";
import { axiosInstance, getToken, isRequestedUser } from "@/auth/auth";
import { followUser } from "@/utils/socialService";
import { toast } from "sonner";
import useDocumentTitle from "@/utils/useDocumentTitle";
import Loader from "../components/Misc/Loader";
import MutualConnections from "../components/User/MutualConnections";
import { CheckmarkBadge02Icon } from "@/Icons/Icons";

export default function Profile() {
  const { username } = useParams();
  const isDashboard = true;
  const [coverHeight, setCoverHeight] = useState("100vh");
  const [userData, setUserData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const token = getToken();

  useEffect(() => {
    const fetchUserData = async () => {
      console.log("Fetching user data...");
      try {
        const response = await axiosInstance.get(`user/${username}/`);
        console.log("API response:", response.data);
        setUserData(response.data);
        setIsFollowing(response.data.is_following);
        console.log("isFollowing set to:", response.data.is_following);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUserData();
  }, [username]);

  console.log("Rendering. isFollowing:", isFollowing);

  useDocumentTitle(
    userData ? `${userData.first_name} (@${userData.username})` : "Profile"
  );

  const handleFollowAction = async () => {
    if (loadingButton) return; // Prevent multiple clicks

    setLoadingButton(true);
    try {
      if (isFollowing) {
        await axios.delete(
          `${apiURL}followers/${userData.username}/unfollow/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.info(`Unfollowed ${userData.username}`);
      } else {
        await followUser(userData.username);
        toast.success(`Following ${userData.username}`);
      }

      const response = await axios.get(`${apiURL}user/${username}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
      setIsFollowing(response.data.is_following);
    } catch (error) {
      toast.error("Error following/unfollowing user:", error);
    } finally {
      setLoadingButton(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newHeight = Math.max(256, window.innerHeight - scrollPosition);
      setCoverHeight(`${newHeight}px`);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyUrl = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast.success("URL copied to clipboard");
      })
      .catch((err) => {
        toast.error("Error copying URL to clipboard:", err);
      });
  };

  if (!userData) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="intro-section w-full">
          <div
            className="intro-section__content flex items-center relative w-svw"
            style={{ height: coverHeight }}
          >
            <div className="cover-pic absolute inset-0 z-0 overflow-hidden">
              <img
                src={userData.cover_pic}
                alt={`${userData.username}'s cover picture`}
                className="h-[150%] w-[150%] object-cover object-center"
              />
            </div>
            <div className="relative h-full flex p-6 items-end w-svw bg-gradient-to-t from-white dark:from-black overflow-hidden to-transparent">
              <img
                src={userData.profile_pic}
                alt={`${userData.username}'s profile picture`}
                className="w-52 mr-4 aspect-square object-cover rounded-full"
              />
              <div className="flex flex-col">
                <h1 className="text-9xl yatra-one-regular font-bold flex items-center gap-5 mb-5">
                  {userData.first_name}
                  {userData.is_verified && (
                    <CheckmarkBadge02Icon width={96} height={96} />
                  )}
                </h1>
                <div className="flex items-center gap-4">
                  <p>@{userData.username}</p>{" "}
                  <Link
                    to={`/vs/${userData.username}/following`}
                    className="hover:underline"
                  >
                    <span className="font-bold">
                      {userData.following_count}{" "}
                    </span>
                    following
                  </Link>
                  <Link
                    to={`/vs/${userData.username}/followers`}
                    className="hover:underline"
                  >
                    <span className="font-bold">
                      {userData.follower_count}{" "}
                    </span>
                    {userData.follower_count < 2 ? "follower" : "followers"}
                  </Link>
                  <Link to="#" className="hover:underline">
                    <span className="font-bold">{userData.post_count} </span>
                    {userData.post_count < 2 ? "post" : "posts"}
                  </Link>
                  <div className="buttons flex gap-2 ml-4">
                    {!isRequestedUser() && (
                      <Button
                        variant="outline"
                        onClick={handleFollowAction}
                        disabled={loadingButton}
                      >
                        {isFollowing ? (
                          <>
                            Unfollow{" "}
                            <UserRoundMinus className="ml-2" size={20} />
                          </>
                        ) : (
                          <>
                            Follow <UserRoundPlus className="ml-2" size={20} />
                          </>
                        )}
                      </Button>
                    )}
                    {isRequestedUser() && (
                      <EditProfile
                        profilePicture={userData.profile_pic}
                        coverPicture={userData.cover_pic}
                        displayName={userData.first_name}
                        bio={userData.bio}
                        username={userData.username}
                        dateOfBirth={userData.date_of_birth}
                        gender={userData.gender}
                      />
                    )}
                    <Button onClick={handleCopyUrl}>
                      Share Profile
                      <Share2 size={20} className="ml-2" />{" "}
                    </Button>
                  </div>
                </div>
                <p>{userData.bio}</p>
                <p className="text-xs">
                  {userData.gender === "M"
                    ? "he/him"
                    : userData.gender === "F"
                    ? "she/her"
                    : null}
                </p>
                {!isRequestedUser() && (
                  <MutualConnections username={username} isText={true} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="posts-section mt-5 flex">
          <Posts username={username} isDashboard={isDashboard} />
        </div>
      </div>
    </>
  );
}
