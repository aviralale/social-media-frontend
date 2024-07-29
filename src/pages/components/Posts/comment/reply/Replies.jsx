import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Fragment, useEffect, useState } from "react";
import Reply from "./Reply";
import { apiURL } from "@/utils/apiUrl";
import { axiosInstance } from "@/auth/auth";

export function Replies(props) {
  const [replies, setReplies] = useState([]);
  const fetchReplies = async () => {
    try {
      const response = await axiosInstance.get(
        `comments/${props.commentId}/replies/`
      );
      setReplies(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchReplies();
  }, [props.id]);
  return (
    <ScrollArea className=" max-h-[48rem] min-w-96 rounded-md border">
      <div className="p-4">
        {replies.map((reply) => (
          <Fragment key={reply.id}>
            <Reply
              {...reply}
              commentId={props.commentId}
              fetchReplies={fetchReplies}
            />
            <Separator className="my-2" />
          </Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
