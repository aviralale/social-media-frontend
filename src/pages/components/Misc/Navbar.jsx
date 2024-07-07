import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="fixed bottom-10 bordered rounded-full bg-black">
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
          <NavLink>Profile</NavLink>
        </li>
      </ul>
    </div>
  );
}
