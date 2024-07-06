import React from "react";

export default function Layout({ children }) {
  return (
    <>
      <div className="grid w-[100vw] h-[100%] place-items-center">
        {children}
      </div>
    </>
  );
}
