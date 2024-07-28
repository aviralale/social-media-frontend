import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { apiAuthURL } from "@/utils/apiUrl";
export default function ForgotPassword(props) {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    props.setProgress(10);
    try {
      const data = {
        email: email,
      };
      const response = await axios.post(
        `${apiAuthURL}users/reset_password/`,
        data
      );
      props.setProgress(100);
      toast.success("Reset link sent successfully, please check your mail.");
    } catch (error) {
      props.setProgress(100);
      toast.error("Error sending reset link");
      console.log(error);
    }
  };
  console.log(email);
  return (
    <div className="flex items-center justify-center flex-col mt-8">
      <h1 className="text-7xl yatra-one-regular font-bold text-center">
        Forgot your password?
      </h1>
      <div className="grid mt-5 gap-2">
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="johndoe@example.com"
          required
        />
        <Button type="submit" onClick={handleForgotPassword} className="w-full">
          Send Reset Link
        </Button>
      </div>
    </div>
  );
}
