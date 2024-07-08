import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import replyData from "@/data/replyData";
import { Fragment, useEffect, useState } from "react";
import Reply from "./Reply";
import axios from "axios";
import { apiURL } from "@/utils/apiUrl";

export function Replies(props) {
  const [replies, setReplies] = useState([]);
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await axios.get(
          `${apiURL}/api/comments/${props.commentId}/replies/`
        );
        setReplies(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReplies();
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
