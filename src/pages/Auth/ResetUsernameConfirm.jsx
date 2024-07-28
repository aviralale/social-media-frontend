import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { apiAuthURL } from "@/utils/apiUrl";
import { toast } from "sonner";
import { useState } from "react";
import axios from "axios";
export default function ResetUsernameConfirm(props) {
  const { uid, token } = useParams();
  const [newUsername, setNewUsername] = useState("");
  const [reNewUsername, setReNewUsername] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = async () => {
    props.setProgress(10);
    try {
      const data = {
        uid: uid,
        token: token,
        new_username: newUsername,
        re_new_username: reNewUsername,
      };
      const response = await axios.post(
        `${apiAuthURL}users/reset_username_confirm/`,
        data
      );
      toast.success("Username changed successfully");
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
        Set a new username.
      </h1>
      <div className="grid mt-5 gap-2 border p-5 rounded-lg">
        <Label htmlFor="new_username">Enter your new username: </Label>
        <Input
          id="new_username"
          type="username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          required
        />
        <Label htmlFor="re_new_username">Retype your new username: </Label>
        <Input
          id="re_new_username"
          type="username"
          value={reNewUsername}
          onChange={(e) => setReNewUsername(e.target.value)}
          required
        />
        <Button type="submit" onClick={handleUsernameChange} className="w-full">
          Reset Username
        </Button>
      </div>
    </div>
  );
}
