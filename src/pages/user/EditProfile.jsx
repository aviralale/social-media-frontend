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
import { Textarea } from "@/components/ui/textarea";
import { ModeToggle } from "../components/ToggleMode";
import { useState } from "react";

export default function EditProfile(props) {
  const [pfp, setPfp] = useState(props.profilePicture);
  const [coverImg, setCoverImg] = useState(props.coverPicture);
  const handlePfpChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPfp(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCoverImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {pfp && (
            <img
              src={pfp}
              alt="Preview"
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
              onChange={handlePfpChange}
            />
          </div>
          {coverImg && (
            <img
              src={coverImg}
              alt="Preview"
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
              onChange={handleCoverImgChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">
              First Name
            </Label>
            <Input
              id="firstName"
              value={props.firstName}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="middleName" className="text-right">
              Middle Name
            </Label>
            <Input
              id="middleName"
              value={props.middleName}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">
              Last Name
            </Label>
            <Input
              id="lastName"
              value={props.lastName}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">
              Bio
            </Label>
            <Textarea id="bio" value={props.bio} className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
        <ModeToggle />
      </SheetContent>
    </Sheet>
  );
}
