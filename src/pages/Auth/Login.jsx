import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LogInBg from "../../assets/login-bg.png";

export function Login() {
  return (
    <div className="flex items-center justify-center mt-8">
      <img src={LogInBg} alt="" className="absolute bottom-0 z-[-1] " />
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl yatra-one-regular">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="username">Username</Label>
                <Link
                  to="/forgot-username"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your username?
                </Link>
              </div>
              <Input id="username" type="text" placeholder="johndoe" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
