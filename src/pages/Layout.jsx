import { isAuthenticated } from "@/auth/auth";
import Navbar from "./components/Misc/Navbar";
import { Link } from "react-router-dom";
import Logo from '@/assets/photos/logo-white.svg'
export default function Layout({ children }) {

  return (
    <>
      <div className="grid w-[100vw] h-[100%] place-items-center">
        <Link className="flex gap-1 items-center w-16 fixed left-3 top-3 z-50 drop-shadow-lg" to="/"><img src={Logo}  alt="VibeSphere Logo" /> <h1 className="yatra-one-regular text-3xl">VibeSphere</h1></Link>
        {children}
        {isAuthenticated() ? <Navbar /> : null}
      </div>
    </>
  );
}
