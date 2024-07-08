import { CalendarIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { BadgeCheck, EllipsisVertical } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import formatDate from "@/utils/formatDate";
import { apiURL } from "@/utils/apiUrl";

export default function PostHeader(props) {
  const [report, setReport] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReport(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <HoverCard>
        <div className="flex justify-between">
          <HoverCardTrigger asChild>
            <Button className="flex gap-2 mb-2" variant="link">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  className="object-cover aspect-square"
                  src={`${apiURL}${props.profilePicture}`}
                />
                <AvatarFallback>AH</AvatarFallback>
              </Avatar>
              @{props.username}{" "}
              {props.isVerified ? <BadgeCheck size={16} /> : ""}
            </Button>
          </HoverCardTrigger>
          <Drawer>
            <DrawerTrigger>
              <EllipsisVertical />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>
                  Report this post by {props.firstName} {props.lastName}?
                </DrawerTitle>
                <DrawerDescription>
                  This action cannot be undone.
                </DrawerDescription>
                <div className="flex flex-col gap-4">
                  <Label htmlFor="pfp" className="text">
                    Submit a screenshot:
                  </Label>
                  <Input
                    type="file"
                    id="pfp"
                    className="col-span-3"
                    onChange={handleImageChange}
                    required
                  />
                  {report && (
                    <img
                      src={report}
                      alt="Preview"
                      id="complainScreenshot"
                      className="w-48 h-48 object-cover border border-gray-300 rounded-full"
                    />
                  )}
                  <Textarea
                    id="complainText"
                    className="col-span-3"
                    placeholder="Let us know if something's wrong about this."
                    required
                  />
                </div>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        <HoverCardContent className="max-w-80 flex">
          <div className="flex justify-between space-x-4">
            <Avatar>
              <AvatarImage
                className="object-cover aspect-square"
                src={`${apiURL}${props.profilePicture}`}
              />
              <AvatarFallback>AH</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold flex gap-1 items-center ">
                @{props.username}
                {props.isVerified ? <BadgeCheck size={16} /> : ""}
              </h4>
              <span to="#" className=" text-sm">
                <span className="font-bold">{props.followingCount} </span>
                following
              </span>
              {"\t"}
              <span to="#" className=" text-sm">
                <span className="font-bold">{props.followerCount} </span>
                {props.followerCount < 2 ? "follower" : "followers"}
              </span>
              <div className="flex items-center pt-2">
                <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  Posted {formatDate(props.postPosted)}
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}
