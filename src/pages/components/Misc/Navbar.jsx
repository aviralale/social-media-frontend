import { getUsername } from "@/auth/auth";
import { BadgePlus, MessagesSquare, Telescope, UserRound } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import Logo from "@/assets/photos/logo-white.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export default function Navbar() {
  const username = getUsername();
  return (
    <div className="fixed bottom-10 bordered rounded-full bg-white dark:bg-black border border-gray-800">
      <ul className="flex p-3 gap-8 items-center relative">
        <li>
        <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
          <NavLink to="/">
            <img src={Logo} className="w-6 transition-all ease duration-200 hover:scale-150 invert dark:invert-0 hover:bg-gray-900 overflow-hidden hover:rounded-full" alt="VibeSphere Logo" />
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
          <NavLink to="/explore">
            <Telescope className="transition-all ease duration-200 hover:scale-150 hover:bg-orange-100 dark:hover:bg-gray-900 overflow-hidden hover:rounded-full" />
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
                <Link>
                  <BadgePlus className="transition-all ease duration-200 hover:bg-orange-100 hover:scale-150 hover:rotate-90 dark:hover:bg-gray-900 overflow-hidden hover:rounded-full" />
                </Link>
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
          <NavLink to="/inbox">
            <MessagesSquare className="transition-all ease duration-200 hover:bg-orange-100 hover:scale-150 dark:hover:bg-gray-900 overflow-hidden hover:rounded-full" />
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
          <NavLink to={`/vs/${username}`}>
            <UserRound className="transition-all ease duration-200 hover:bg-orange-100 hover:scale-150 dark:hover:bg-gray-900 overflow-hidden hover:rounded-full" />
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
