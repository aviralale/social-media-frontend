import React from "react";
import NotFoundBg from "../../assets/photos/404.png";
import { Link } from "react-router-dom";
export default function PageNotFound() {
  return (
    <div className="flex items-center justify-center mt-8">
      <img src={NotFoundBg} alt="" className="absolute bottom-0 z-[-1] " />
      <div>
        <h1 className="text-7xl yatra-one-regular font-bold text-center">
          404
        </h1>
        <h1 className="text-5xl yatra-one-regular font-bold text-center">
          Page not found.
        </h1>
        <p className="text-center">
          <Link to="/" className="underline">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
