import { isAuthenticated } from "@/auth/auth";
import Navbar from "./components/Misc/Navbar";
import { useLocation } from "react-router-dom";

export default function Layout({ children, ...props }) {
  const location = useLocation();
  const CheckIfAtHome = () => {
    return location.pathname === "/";
  };

  return (
    <div className="grid w-[100vw] h-[100%] place-items-center">
      {children}
      {isAuthenticated() && !CheckIfAtHome() && (
        <Navbar setProgress={props.setProgress} />
      )}
    </div>
  );
}
