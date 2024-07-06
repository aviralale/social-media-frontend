import React from "react";
import Post from "./Post";
const postsData = [1, 2, 3, 4, 5, 6, 7];
export default function Posts(props) {
  return (
    <>
      <div className="flex flex-col justify-center w-[70vw] items-center">
        <h1 className="text-5xl yatra-one-regular">Posts</h1>
        <div className="flex flex-wrap mt-5">
          {postsData.map((post, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-2">
              <Post isDashboard={props.isDashboard} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
