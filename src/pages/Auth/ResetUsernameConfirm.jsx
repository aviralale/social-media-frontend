import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
export default function ResetUsernameConfirm() {
  return (
    <div className="flex items-center justify-center flex-col mt-8">
      <h1 className="text-7xl yatra-one-regular font-bold text-center">
        Set a new username.
      </h1>
      <div className="grid mt-5 gap-2 border p-5 rounded-lg">
        <Label htmlFor="new_username">Enter your new username: </Label>
        <Input id="new_username" type="username" required />
        <Label htmlFor="re_new_username">Retype your new username: </Label>
        <Input id="re_new_username" type="username" required />
        <Button type="submit" className="w-full">
          Reset Password
        </Button>
      </div>
    </div>
  );
}
