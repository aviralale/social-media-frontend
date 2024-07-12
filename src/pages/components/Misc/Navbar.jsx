import { getUsername } from "@/auth/auth";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const username = getUsername();
  return (
    <div className="fixed bottom-10 bordered rounded-full bg-white dark:bg-black">
      <ul className="flex p-3 gap-2">
        <li>
          <NavLink>Home</NavLink>
        </li>
        <li>
          <NavLink>Search</NavLink>
        </li>
        <li>
          <NavLink>Chats</NavLink>
        </li>
        <li>
          <NavLink to={`/${username}`}>Profile</NavLink>
        </li>
      </ul>
    </div>
  );
}
