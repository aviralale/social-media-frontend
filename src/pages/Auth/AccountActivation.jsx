import React from "react";
import ActivationBg from "../../assets/photos/acc-activation.png";
export default function AccountActivation() {
  return (
    <>
      <div className="flex items-center justify-center mt-8">
        <img src={ActivationBg} alt="" className="absolute bottom-0 z-[-1] " />
        <div>
          <h1 className="text-7xl yatra-one-regular font-bold text-center">
            Registered Successfully.
          </h1>
          <h1 className="text-2xl text-center">
            Check your mail to activate your account and continue further.
          </h1>
        </div>
      </div>
      <h1 className="text-center mt-5">
        Didn't receive a mail? Click here to resend it.
      </h1>
    </>
  );
}
