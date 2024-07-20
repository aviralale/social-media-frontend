import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ModeToggle } from "../components/ToggleMode";
import { useState, useEffect } from "react";
import { axiosInstance, getToken, logout } from "@/auth/auth";
import { toast } from "sonner";
import { Settings } from "lucide-react";
import DeleteAccount from "../components/User/DeleteAccount";
import { useNavigate } from "react-router-dom";

export default function EditProfile(props) {
  const navigate = useNavigate();

  const [pfp, setPfp] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [displayName, setDisplayName] = useState(props.displayName || "");
  const [bio, setBio] = useState(props.bio || "");
  const [gender, setGender] = useState(props.gender || "");
  const [dateOfBirth, setDateOfBirth] = useState(props.dateOfBirth || "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!props.displayName) {
      fetchProfileData();
    }
  }, [props.displayName]);

  const fetchProfileData = async () => {
    try {
      const { data } = await axiosInstance.get("/api/auth/users/me/", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setDisplayName(data.first_name || "");
      setBio(data.bio || "");
      setGender(data.gender || "");
      setDateOfBirth(data.date_of_birth || "");
    } catch (error) {
      toast.error("Failed to fetch profile data");
    }
  };

  const handleFileChange = (setter) => (e) => {
    if (e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("first_name", displayName);
    formData.append("bio", bio);
    formData.append("gender", gender);
    formData.append("date_of_birth", dateOfBirth);
    if (pfp) formData.append("profile_pic", pfp);
    if (coverImg) formData.append("cover_pic", coverImg);

    try {
      const { data } = await axiosInstance.patch(
        "/api/auth/users/me/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setDisplayName(data.first_name || "");
      setBio(data.bio || "");
      setGender(data.gender || "");
      setDateOfBirth(data.date_of_birth || "");
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Error details:", error.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    try {
      logout();
      toast("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          Edit Profile
          <Settings size={20} className="ml-2" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <Settings className="mr-2" /> Edit Profile
          </SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          {pfp && (
            <img
              src={URL.createObjectURL(pfp)}
              alt="Profile Picture Preview"
              className="w-48 h-48 object-cover border border-gray-300 rounded-full"
            />
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pfp" className="text-right">
              Profile Picture:
            </Label>
            <Input
              type="file"
              id="pfp"
              className="col-span-3"
              onChange={handleFileChange(setPfp)}
            />
          </div>
          {coverImg && (
            <img
              src={URL.createObjectURL(coverImg)}
              alt="Cover Image Preview"
              className="h-48 object-cover border border-gray-300 rounded-lg"
            />
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="coverImage" className="text-right">
              Cover Image:
            </Label>
            <Input
              type="file"
              id="coverImage"
              className="col-span-3"
              onChange={handleFileChange(setCoverImg)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="displayName" className="text-right">
              Display Name
            </Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right">
              Bio
            </Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right">
              Gender
            </Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="M">Male</SelectItem>
                <SelectItem value="F">Female</SelectItem>
                <SelectItem value="O">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dateOfBirth" className="text-right">
              Date of Birth
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="col-span-3"
            />
          </div>
        </form>
        <SheetFooter className="mb-4">
          <SheetClose asChild>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </SheetClose>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </SheetFooter>
        <DeleteAccount />
        <ModeToggle />
      </SheetContent>
    </Sheet>
  );
}
