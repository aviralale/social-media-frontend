import { useState } from "react";
import { Link } from "react-router-dom";
import Posts from "../components/Posts/Posts";
import { Button } from "@/components/ui/button";
import EditProfile from "./EditProfile";
import { BadgeCheck } from "lucide-react";

export default function Dashboard() {
  const [isVerified, setIsVerified] = useState(true);
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="intro-section">
          <div className="intro-section__content flex items-center relative w-svw ">
            <div className="cover-pic absolute z-[-1]">
              <img
                src="http://127.0.0.1:8000/media/media/user_cover_pic/_MG_0525.JPG"
                alt="sitetesters's cover picture"
                className=" h-64 w-svw object-cover object-center"
              />
            </div>
            <div className="relative flex p-6 items-center w-svw bg-gradient-to-t from-white dark:from-black overflow-hidden to-transparent">
              <img
                src="http://127.0.0.1:8000/media/media/user_avatar/438065279_1215865809405912_5372992020956987802_n.jpg"
                alt="sitetesters's profile picture"
                className=" w-52 mr-4 aspect-square object-cover rounded-full"
              />
              <h1 className=" -rotate-12 opacity-15 text-[25rem] absolute top-[-200px] right-[-760px] yatra-one-regular text-outline-white z-[-1] font-bold">
                Aviral Ale
              </h1>
              <div className="flex flex-col">
                <h1 className="text-9xl yatra-one-regular font-bold flex items-center gap-5">
                  Aviral Ale
                  {isVerified ? (
                    <BadgeCheck size="96px" color="rgb(0, 110, 255)" />
                  ) : (
                    ""
                  )}
                </h1>
                <div className="flex items-center gap-4">
                  <p>@sitetester</p>{" "}
                  <Link to="#" className="hover:underline">
                    <span className="font-bold">142 </span>
                    following
                  </Link>
                  <Link to="#" className="hover:underline">
                    <span className="font-bold">142 </span>
                    followers
                  </Link>
                  <Link to="#" className="hover:underline">
                    <span className="font-bold">69 </span>posts
                  </Link>
                  <div className="buttons flex gap-2 ml-4">
                    <Button>Follow</Button>
                    <EditProfile />
                  </div>
                </div>
                <p>watching the wheels go round and round.</p>
                <p className="text-xs">he/him</p>
              </div>
            </div>
          </div>
        </div>
        <div className="posts-section mt-5 flex">
          <Posts />
        </div>
      </div>
    </>
  );
}
