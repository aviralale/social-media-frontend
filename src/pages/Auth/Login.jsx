import { Link, useNavigate } from "react-router-dom";
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
import LogInBg from "../../assets/photos/login-bg.png";
import { useState } from "react";
import { loginUser } from "@/auth/auth";
import { toast } from "sonner";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    try {
      if (await loginUser(data)) {
        toast.success("Logged in successfully.");
        navigate("/");
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      const errorResponse = error.response
        ? error.response.data
        : {
            detail:
              "An error occurred, please check your username and password.",
          };
      const errorMessages = Object.values(errorResponse).flat();
      errorMessages.forEach((message) => {
        toast.error(message);
      });
    }
  };

  return (
    <div className="flex items-center justify-center mt-8">
      <img src={LogInBg} alt="" className="absolute bottom-0 z-[-1]" />
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl yatra-one-regular">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
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
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
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
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
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
