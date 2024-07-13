import { isAuthenticated } from "@/auth/auth";
import Navbar from "./components/Misc/Navbar";
export default function Layout({ children }) {

  return (
    <>
      <div className="grid w-[100vw] h-[100%] place-items-center">
        {children}
        {isAuthenticated() ? <Navbar /> : null}
      </div>
    </>
  );
}
