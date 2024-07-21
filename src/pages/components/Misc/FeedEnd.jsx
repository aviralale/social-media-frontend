import { CheckmarkCircle02Icon } from "@/Icons/Icons";
import React from "react";
import { Link } from "react-router-dom";

export default function FeedEnd() {
  return (
    <div className="flex flex-col gap-6  mt-10 justify-center items-center">
      <CheckmarkCircle02Icon width={96} height={96} />
      <p>You're all caught up.</p>
      <Link to="/explore" className="hover:underline">
        Explore VibeSphere
      </Link>
    </div>
  );
}
