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
import RegBg from "../../assets/photos/reg-bg.png";
import { useState } from "react";
import { registerUser } from "@/auth/auth";
import { toast } from "sonner";

export default function Register(props) {
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      setMessage("Password does not match");
      return;
    }
    const data = {
      first_name: firstName,
      username: username,
      email: email,
      password: password,
      re_password: rePassword,
    };
    try {
      props.setProgress(10);
      const res = await registerUser(data);
      console.log(res);
      props.setProgress(100);
      navigate("/activate");
    } catch (err) {
      props.setProgress(10);
      const errorMessages = Object.values(err).flat();
      errorMessages.forEach((message) => {
        toast.error(message);
        props.setProgress(100);
      });
    }
  };

  return (
    <div className="flex items-center justify-center mt-8">
      <img src={RegBg} alt="" className="absolute bottom-0 z-[-1]" />
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl yatra-one-regular">Register</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-2">
                <Label htmlFor="first-name">Display Name</Label>
                <Input
                  id="first-name"
                  placeholder="John Doe"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="johndoe@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="re_password">Retype Password</Label>
              <Input
                id="re_password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                type="password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
