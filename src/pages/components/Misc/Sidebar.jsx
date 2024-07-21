import { getUsername } from "@/auth/auth";
import { Compass, MessagesSquare, SquarePlus, UserRound } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import Logo from "@/assets/photos/logo-white.svg";
import Navbar from "./Navbar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreatePost from "../Posts/CreatePost";

export default function Sidebar() {
  const username = getUsername();
  const LargeScreenNavbar = () => (
    <div className=" flex flex-col justify-between border-r min-h-[100vh] pr-16 border-gray-500">
      <ul className="flex flex-col mt-16 pl-2">
        {[
          {
            to: "/",
            icon: (
              <img
                src={Logo}
                alt="VibeSphere Logo"
                className="w-8 h-8 invert dark:invert-0"
              />
            ),
            text: "VibeSphere",
          },
          { to: "/inbox", icon: <MessagesSquare />, text: "Inbox" },
          { to: "/explore", icon: <Compass />, text: "Explore" },
          { to: `/vs/${username}`, icon: <UserRound />, text: "Profile" },
        ].map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.to}
              className={`flex items-center gap-2 transition-all ease duration-200 p-2 rounded-xl hover:bg-zinc-900  ${
                index === 0 ? "mb-4" : ""
              }`}
            >
              {item.icon}
              <h1
                className={`text-${index === 0 ? "2xl" : ""} ${
                  index === 0 ? "yatra-one-regular" : ""
                } `}
              >
                {item.text}
              </h1>
            </NavLink>
          </li>
        ))}
        <Dialog>
          <DialogTrigger className="flex items-center gap-2 transition-all ease duration-200 p-2 rounded-xl hover:bg-zinc-900 ">
            <SquarePlus /> Create
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="yatra-one-regular">
                Create Post
              </DialogTitle>
              <CreatePost />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </ul>
    </div>
  );

  return (
    <>
      <div className="md:hidden">
        <Navbar />
      </div>
      <div className="hidden md:block">
        <LargeScreenNavbar />
      </div>
    </>
  );
}
