import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function ForgotUsername() {
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
          required
        />
        <Button type="submit" className="w-full">
          Send Reset Link
        </Button>
      </div>
    </div>
  );
}
