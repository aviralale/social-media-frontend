import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
export default function ResetPasswordConfirm() {
  return (
    <div className="flex items-center justify-center flex-col mt-8">
      <h1 className="text-7xl yatra-one-regular font-bold text-center">
        Set a new password.
      </h1>
      <div className="grid mt-5 gap-2 border p-5 rounded-lg">
        <Label htmlFor="new_password">Enter your new password: </Label>
        <Input id="new_password" type="password" required />
        <Label htmlFor="re_new_password">Retype your new password: </Label>
        <Input id="re_new_password" type="password" required />
        <Button type="submit" className="w-full">
          Reset Password
        </Button>
      </div>
    </div>
  );
}
