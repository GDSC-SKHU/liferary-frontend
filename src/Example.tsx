import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";

export default function Example() {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <YouTube
      videoId="5ch94AaPZRQ&t=1225s"
      opts={opts}
      onReady={onPlayerReady}
    />
  );
}
