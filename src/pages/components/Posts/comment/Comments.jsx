import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Comment from "./Comment";
import commentData from "@/data/commentData";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiURL } from "@/utils/apiUrl";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function Comments() {
  const { postid } = useParams();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchCommments = async () => {
      try {
        const response = await axios.get(
          `${apiURL}/api/posts/${postid}/comments/`
        );
        setComments(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCommments();
  }, []);
  return (
    <div className="flex flex-col justify-between border rounded-md min-w-96">
      <ScrollArea className=" max-h-[48rem]">
        <div className="p-4">
          <h4 className="mb-4 text-md font-medium leading-none">Comments</h4>
          {comments.map((comment) => (
            <Fragment key={comment.id}>
              <Comment {...comment} />
              <Separator className="my-2" />
            </Fragment>
          ))}
        </div>
      </ScrollArea>
      <div className="flex flex-col">
        <Textarea placeholder="Enter a comment..." />
        <Button>Comment</Button>
      </div>
    </div>
  );
}
