import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Comment from "./Comment";
import commentData from "@/data/commentData";
import { Fragment, useEffect, useState } from "react";

export function Comments() {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    async function loadComments() {
      const data = commentData;
      setComments(data);
    }
    loadComments();
  }, []);
  return (
    <ScrollArea className=" max-h-[48rem] min-w-96 rounded-md border">
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
  );
}
