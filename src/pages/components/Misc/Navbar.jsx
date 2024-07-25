import React from "react";
import { getUsername } from "@/auth/auth";
import {
  AddSquareIcon,
  DiscoverCircleIcon,
  MessageMultiple02Icon,
  Notification02Icon,
  Search01Icon,
  UserSharingIcon,
} from "@/Icons/Icons";
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

export default function Navbar(props) {
  const username = getUsername();

  return (
    <div className="fixed -bottom-[50px] bordered rounded-full bg-white dark:bg-black border border-gray-800 hover:bottom-0 transition-all duration-200 ease-in">
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
                  to="/search"
                  className="transition-all ease duration-200 hover:scale-150 hover:bg-orange-100 dark:hover:bg-gray-900 overflow-hidden hover:rounded-full block"
                >
                  <Search01Icon />
                </NavLink>
              </TooltipTrigger>
              <TooltipContent className="mb-2">
                <p>Search</p>
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
                  <DiscoverCircleIcon />
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
              <Dialog>
                <TooltipTrigger asChild>
                  <DialogTrigger className="flex transition-all ease duration-200 hover:scale-150 hover:bg-orange-100 dark:hover:bg-gray-900 overflow-hidden hover:rounded-full items-center gap-2 ease p-2 rounded-xl ">
                    <AddSquareIcon />
                  </DialogTrigger>
                </TooltipTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="yatra-one-regular">
                      Create Post
                    </DialogTitle>
                    <CreatePost setProgress={props.setProgress} />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <TooltipContent className="mb-2">
                <p>Create new post</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
        <li>
          <TooltipProvider>
            <Tooltip>
              <Dialog>
                <TooltipTrigger asChild>
                  <DialogTrigger className="flex transition-all ease duration-200 hover:scale-150 hover:bg-orange-100 dark:hover:bg-gray-900 overflow-hidden hover:rounded-full items-center gap-2 ease p-2 rounded-xl ">
                    <Notification02Icon />
                  </DialogTrigger>
                </TooltipTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="yatra-one-regular">
                      Create Post
                    </DialogTitle>
                    <CreatePost />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <TooltipContent className="mb-2">
                <p>Notifications</p>
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
                  <MessageMultiple02Icon />
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
                  <UserSharingIcon />
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
