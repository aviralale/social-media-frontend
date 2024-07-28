import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { apiAuthURL } from "@/utils/apiUrl";
import { toast } from "sonner";
export default function ResetPasswordConfirm(props) {
  const { uid, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = async () => {
    props.setProgress(10);
    try {
      const data = {
        uid: uid,
        token: token,
        new_password: newPassword,
        re_new_password: reNewPassword,
      };
      const response = await axios.post(
        `${apiAuthURL}users/reset_password_confirm/`,
        data
      );
      toast.success("Password changed successfully");
      navigate("/login");
      props.setProgress(100);
    } catch (error) {
      console.log(error);
      props.setProgress(100);
    }
  };
  return (
    <div className="flex items-center justify-center flex-col mt-8">
      <h1 className="text-7xl yatra-one-regular font-bold text-center">
        Set a new password.
      </h1>
      <div className="grid mt-5 gap-2 border p-5 rounded-lg">
        <Label htmlFor="new_password">Enter your new password: </Label>
        <Input
          id="new_password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Label htmlFor="re_new_password">Retype your new password: </Label>
        <Input
          id="re_new_password"
          type="password"
          value={reNewPassword}
          onChange={(e) => setReNewPassword(e.target.value)}
          required
        />
        <Button type="submit" onClick={handlePasswordChange} className="w-full">
          Reset Password
        </Button>
      </div>
    </div>
  );
}
