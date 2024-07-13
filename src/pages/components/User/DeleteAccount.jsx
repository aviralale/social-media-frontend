import { axiosInstance, getToken } from "@/auth/auth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function DeleteAccount() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleAccountDeletion = async (e) => {
    e.preventDefault();
    try {
      const data = {
        current_password: password,
      };
      await axiosInstance.delete("/api/auth/users/me/", {
        data,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      toast.info("Account deleted successfully.");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to delete account: " + error.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="mb-2 float-right">
          Delete my account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete your account</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAccountDeletion}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" variant="destructive">
              Delete my account forever
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
