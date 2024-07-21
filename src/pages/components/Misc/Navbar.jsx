import React from "react";
import { getUsername } from "@/auth/auth";
import { Compass, MessagesSquare, SquarePlus, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "@/assets/photos/logo-white.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreatePost from "../Posts/CreatePost";

export default function Navbar() {
  const username = getUsername();

  return (
    <div className="fixed bottom-10 bordered rounded-full bg-white dark:bg-black border border-gray-800">
      <ul className="flex p-3 gap-8 items-center relative">
        <li>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink
                  to="/"
                  className="transition-all ease duration-200 hover:scale-150 hover:bg-orange-100 dark:hover:bg-gray-900 overflow-hidden hover:rounded-full block"
                >
                  <img
                    src={Logo}
                    alt="VibeSphere Logo"
                    className="w-6 invert dark:invert-0"
                  />
                </NavLink>
              </TooltipTrigger>
              <TooltipContent className="mb-2">
                <p>Home</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>

        <li>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink
                  to="/explore"
                  className="transition-all ease duration-200 hover:scale-150 hover:bg-orange-100 dark:hover:bg-gray-900 overflow-hidden hover:rounded-full block"
                >
                  <Compass />
                </NavLink>
              </TooltipTrigger>
              <TooltipContent className="mb-2">
                <p>Explore</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>

        <li>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Dialog>
                  <DialogTrigger className="flex transition-all ease duration-200 hover:scale-150 hover:bg-orange-100 dark:hover:bg-gray-900 overflow-hidden hover:rounded-full items-center gap-2 ease p-2 rounded-xl ">
                    <SquarePlus />
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
              </TooltipTrigger>
              <TooltipContent className="mb-2">
                <p>Create new post</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>

        <li>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink
                  to="/inbox"
                  className="transition-all ease duration-200 hover:scale-150 hover:bg-orange-100 dark:hover:bg-gray-900 overflow-hidden hover:rounded-full block"
                >
                  <MessagesSquare />
                </NavLink>
              </TooltipTrigger>
              <TooltipContent className="mb-2">
                <p>Chats</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>

        <li>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink
                  to={`/vs/${username}`}
                  className="transition-all ease duration-200 hover:scale-150 hover:bg-orange-100 dark:hover:bg-gray-900 overflow-hidden hover:rounded-full block"
                >
                  <UserRound />
                </NavLink>
              </TooltipTrigger>
              <TooltipContent className="mb-2">
                <p>View profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      </ul>
    </div>
  );
}
