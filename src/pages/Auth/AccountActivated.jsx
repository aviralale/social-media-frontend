import React from "react";
import ActivationBg from "../../assets/photos/acc-activation.png";
import { Link } from "react-router-dom";
export default function AccountActivated() {
  return (
    <>
      <div className="flex items-center justify-center mt-8">
        <img src={ActivationBg} alt="" className="absolute bottom-0 z-[-1] " />
        <div>
          <h1 className="text-7xl yatra-one-regular font-bold text-center">
            Account Activated Successfully.
          </h1>
          <h1 className="text-2xl text-center">
            Thank you for being part of VibeSphere. You can now{" "}
            <Link to="/login" className="underline">
              login
            </Link>
            .
          </h1>
        </div>
      </div>
    </>
  );
}
