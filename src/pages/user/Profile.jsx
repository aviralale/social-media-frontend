import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Posts from "../components/Posts/Posts";
import { Button } from "@/components/ui/button";
import EditProfile from "./EditProfile";
import { BadgeCheck, Share2, UserRoundPlus } from "lucide-react";
import axios from "axios";
import { apiURL } from "@/utils/apiUrl";
import { isRequestedUser } from "@/auth/auth";

export default function Profile() {
  const { username } = useParams();
  const isDashboard = true;
  const [coverHeight, setCoverHeight] = useState("100vh");
  const [userData, setUserData] = useState(null);
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/user/${username}/`);
        setUserData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, [username]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newHeight = Math.max(256, window.innerHeight - scrollPosition);
      setCoverHeight(`${newHeight}px`);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="intro-section w-full">
          <div
            className="intro-section__content flex items-center relative w-svw"
            style={{ height: coverHeight }}
          >
            <div className="cover-pic absolute inset-0 z-0">
              <img
                src={userData.cover_pic}
                alt={`${userData.username}'s cover picture`}
                className="h-full w-svw object-cover object-center"
              />
            </div>
            <div className="relative h-full flex p-6 items-end w-svw bg-gradient-to-t from-white dark:from-black overflow-hidden to-transparent">
              <img
                src={userData.profile_pic}
                alt={`${userData.username}'s profile picture`}
                className="w-52 mr-4 aspect-square object-cover rounded-full"
              />
              <div className="flex flex-col">
                <h1 className="text-9xl yatra-one-regular font-bold flex items-center gap-5">
                  {userData.first_name} {userData.last_name}
                  {userData.is_verified && <BadgeCheck size="96px" />}
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
                    {isRequestedUser()? <EditProfile
                      profilePicture={userData.profile_pic}
                      coverPicture={userData.cover_pic}
                      displayName={userData.first_name}
                      bio={userData.bio}
                      username={userData.username}
                      dateOfBirth={userData.date_of_birth}
                      gender={userData.gender}
                      /> : 
                      <Button variant="outline">Follow <UserRoundPlus className="ml-2" size={20}/></Button>
                      }
                    
                      <Button>Share Profile<Share2 size={20} className="ml-2"/> </Button>
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
