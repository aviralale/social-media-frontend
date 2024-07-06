import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Posts from "../components/Posts/Posts";
import { Button } from "@/components/ui/button";
import EditProfile from "./EditProfile";
import { BadgeCheck } from "lucide-react";
import userData from "@/data/userData";

export default function Dashboard() {
  const [isVerified, setIsVerified] = useState(true);
  const isDashboard = true;
  const coverPicRef = useRef(null);
  const [coverHeight, setCoverHeight] = useState("100vh");
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newHeight = Math.max(256, window.innerHeight - scrollPosition);
      setCoverHeight(`${newHeight}px`);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="intro-section w-full">
          <div
            className="intro-section__content flex items-center relative w-svw "
            style={{ height: coverHeight }}
          >
            <div className="cover-pic absolute inset-0 z-0">
              <img
                src={userData.cover_pic}
                alt={`${userData.username}'s cover picture`}
                className=" h-full w-svw object-cover object-center"
              />
            </div>
            <div className="relative h-full flex p-6 items-end w-svw bg-gradient-to-t from-white dark:from-black overflow-hidden to-transparent">
              <img
                src={userData.profile_pic}
                alt={`${userData.username}'s profile picture`}
                className=" w-52 mr-4 aspect-square object-cover rounded-full"
              />
              <div className="flex flex-col">
                <h1 className="text-9xl yatra-one-regular font-bold flex items-center gap-5">
                  Aviral Ale
                  {userData.is_verified ? <BadgeCheck size="96px" /> : ""}
                </h1>
                <div className="flex items-center gap-4">
                  <p>@{userData.username}</p>{" "}
                  <Link to="#" className="hover:underline">
                    <span className="font-bold">
                      {userData.following_count}{" "}
                    </span>
                    following
                  </Link>
                  <Link to="#" className="hover:underline">
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
                    <Button>Follow</Button>
                    <EditProfile
                      profilePicture={userData.profile_pic}
                      coverPicture={userData.cover_pic}
                      firstName={userData.first_name}
                      lastName={userData.last_name}
                      middleName={userData.middle_name}
                      bio={userData.bio}
                    />
                  </div>
                </div>
                <p>{userData.bio}</p>
                <p className="text-xs">
                  {userData.gender === "M"
                    ? "he/him"
                    : userData.gender === "F"
                    ? "she/her"
                    : "they/them"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="posts-section mt-5 flex">
          <Posts isDashboard={isDashboard} />
        </div>
      </div>
    </>
  );
}
