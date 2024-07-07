import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import replyData from "@/data/replyData";
import { Fragment, useEffect, useState } from "react";
import Reply from "./Reply";

export function Replies() {
  const [replies, setReplies] = useState([]);
  useEffect(() => {
    async function loadReplies() {
      const data = await replyData;
      setReplies(Array.isArray(data) ? data : []);
    }
    loadReplies();
  }, []);
  return (
    <ScrollArea className=" max-h-[48rem] min-w-96 rounded-md border">
      <div className="p-4">
        {replies.map((reply) => (
          <Fragment key={reply.id}>
            <Reply {...reply} />
            <Separator className="my-2" />
          </Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
