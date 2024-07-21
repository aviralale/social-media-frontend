import { useState, useEffect } from "react";
import useDocumentTitle from "@/utils/useDocumentTitle";
import HomePosts from "./HomePosts";
import Sidebar from "../components/Misc/Sidebar";
import SidebarRight from "../components/Misc/SidebarRight";
import { myUserData } from "@/auth/auth";
import Loader from "../components/Misc/Loader";

export default function Home() {
  useDocumentTitle("Home");
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await myUserData();
        setData(result);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchData();
  }, []);

  if (!data) {
    return (
      <div>
        <Loader />.
      </div>
    );
  }

  return (
    <div className="flex justify-between min-w-[100vw]">
      <div className="fixed">
        <Sidebar />
      </div>
      <div className="w-96"></div>
      <div>
        <div className="posts-section mt-5 flex">
          <HomePosts />
        </div>
      </div>
      <div className="fixed right-0">
        <SidebarRight {...data} />
      </div>
      <div className="w-96"></div>
    </div>
  );
}
