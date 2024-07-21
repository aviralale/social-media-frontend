import { isAuthenticated } from "@/auth/auth";
import Navbar from "./components/Misc/Navbar";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/Misc/Sidebar";
export default function Layout({ children }) {
  const CheckIfAtHome = () => {
    const location = useLocation();
    return location.pathname === "/";
  };
  return (
    <>
      <div className="grid w-[100vw] h-[100%] place-items-center">
        {children}
        {isAuthenticated() ? CheckIfAtHome() ? null : <Navbar /> : null}
      </div>
    </>
  );
}
