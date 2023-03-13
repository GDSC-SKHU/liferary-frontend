// import { google, youtube_v3 } from "googleapis";

// const youtube = google.youtube({
//   version: "v3",
//   auth: "AIzaSyC8KgzfyvOdThPgk5TomE5VE8K-rIf3u7I",
// });

// export async function Example(query: string) {
//   const { data } = await youtube.search.list({
//     part: ["id", "snippet"],
//     q: query,
//     type: "video",
//     maxResults: 10,
//   });

//   const videos = data.items?.map((item: youtube_v3.Schema$SearchResult) => {
//     return {
//       id: item.id?.videoId,
//       title: item.snippet?.title,
//       thumbnail: item.snippet?.thumbnails?.medium?.url,
//     };
//   });

//   return videos;
// }

// internet

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

  return <YouTube videoId="h2lEk7PkQic" opts={opts} onReady={onPlayerReady} />;
}
