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

export default function PostMedia(props) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

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
          limit={48}
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
          <TruncateText
            className="ml-2 text-sm mb-4"
            text={props.caption}
            limit={48}
          />
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
