import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { apiAuthURL } from "@/utils/apiUrl";
import { toast } from "sonner";
export default function ForgotUsername(props) {
  const [email, setEmail] = useState("");

  const handleForgotUsername = async () => {
    props.setProgress(10);
    try {
      const data = {
        email: email,
      };
      const response = await axios.post(
        `${apiAuthURL}users/reset_username/`,
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
        Forgot your username?
      </h1>
      <div className="grid mt-5 gap-2">
        <Input
          id="email"
          type="email"
          placeholder="johndoe@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" onClick={handleForgotUsername} className="w-full">
          Send Reset Link
        </Button>
      </div>
    </div>
  );
}
