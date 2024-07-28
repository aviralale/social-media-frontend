import { getUsername } from "@/auth/auth";
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
import {
  AddSquareIcon,
  DiscoverCircleIcon,
  MessageMultiple02Icon,
  Notification02Icon,
  Search01Icon,
  UserSharingIcon,
} from "@/Icons/Icons";
import Notifications from "@/pages/Social/Notifications";

export default function Sidebar(props) {
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
          { to: "/search", icon: <Search01Icon />, text: "Search" },
          { to: "/explore", icon: <DiscoverCircleIcon />, text: "Explore" },
          { to: "/inbox", icon: <MessageMultiple02Icon />, text: "Inbox" },
          { to: `/vs/${username}`, icon: <UserSharingIcon />, text: "Profile" },
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
            <AddSquareIcon /> Create
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="yatra-one-regular">
                Create Post
              </DialogTitle>
              <CreatePost setProgress={props.setProgress} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger className="flex items-center gap-2 transition-all ease duration-200 p-2 rounded-xl hover:bg-zinc-900 ">
            <Notification02Icon /> Notifications
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="yatra-one-regular">
                Notifications
              </DialogTitle>
              <Notifications />
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
