import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import TruncateText from "@/utils/TruncateText";
import formatDate from "@/utils/formatDate";
import { Link } from "react-router-dom";
import { getMediaUrl } from "@/utils/getMediaUrl";
import { PencilEdit02Icon } from "@/Icons/Icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditPost from "./EditPost";
import { getUsername } from "@/auth/auth";

export default function PostMedia(props) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  const username = getUsername();

  return props.isDashboard ? (
    <Link to={`/vs/${props.username}/posts/${props.postId}`}>
      <Carousel
        plugins={[]}
        className="w-full max-w-md mt-4"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {props.media.map((item) => (
            <CarouselItem key={item.id}>
              <div className="">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-2">
                    {item.type === "video" ? (
                      <video
                        src={getMediaUrl(item.file)}
                        autoPlay
                        className="rounded-lg w-full h-full object-cover"
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={getMediaUrl(item.file)}
                        alt={`Media ${item.id}`}
                        className="rounded-lg w-full h-full object-cover"
                      />
                    )}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <TruncateText
          className="ml-2 text-sm mb-4"
          text={props.caption}
          limit={64}
        />
        <p className="text-xs ml-2 opacity-50">
          {formatDate(props.postPosted)}
        </p>
      </Carousel>
    </Link>
  ) : (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-4xl mt-4"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      {props.isIndividualPage ? (
        <>
          <CarouselContent>
            {props.media.map((item) => (
              <CarouselItem key={item.id}>
                <div className="">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-2">
                      {item.type === "video" ? (
                        <video
                          src={getMediaUrl(item.file)}
                          autoPlay
                          className="rounded-lg w-full h-full object-cover"
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src={getMediaUrl(item.file)}
                          alt={`Media ${item.id}`}
                          className="rounded-lg w-full h-full object-cover"
                        />
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-baseline">
            <TruncateText
              className="ml-2 text-sm mb-4"
              text={props.caption}
              limit={64}
            />
            <Dialog>
              {username === props.username ? (
                <DialogTrigger className="flex items-center gap-2 transition-all ease duration-200 p-2 rounded-xl hover:bg-zinc-900 ">
                  <PencilEdit02Icon width={14} height={14} />
                </DialogTrigger>
              ) : (
                <></>
              )}

              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="yatra-one-regular">
                    Edit Post
                  </DialogTitle>
                  <EditPost
                    caption={props.caption}
                    setProgress={props.setProgress}
                  />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </>
      ) : (
        <Link to={`/vs/${props.username}/posts/${props.postId}`}>
          <CarouselContent>
            {props.media.map((item) => (
              <CarouselItem key={item.id}>
                <div className="">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-2">
                      {item.type === "video" ? (
                        <video
                          src={getMediaUrl(item.file)}
                          autoPlay
                          className="rounded-lg w-full h-full object-cover"
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src={getMediaUrl(item.file)}
                          alt={`Media ${item.id}`}
                          className="rounded-lg w-full h-full object-cover"
                        />
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <TruncateText
            className="ml-2 text-sm mb-4"
            text={props.caption}
            limit={48}
          />
        </Link>
      )}
      <div className="flex justify-between items-baseline">
        <p className="text-xs ml-2 opacity-50">
          {formatDate(props.postPosted)}
        </p>
        <Link className="text-xs ml-2 opacity-50 hover:underline" to="/">
          {props.commentCount} {props.commentCount < 2 ? "comment" : "comments"}
        </Link>
      </div>
    </Carousel>
  );
}
