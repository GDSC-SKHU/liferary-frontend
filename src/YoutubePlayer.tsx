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

// import React from "react";
// import YouTube, { YouTubeProps } from "react-youtube";

// export default function Example() {
//   const onPlayerReady: YouTubeProps["onReady"] = (event) => {
//     event.target.pauseVideo();
//   };

//   const opts: YouTubeProps["opts"] = {
//     height: "390",
//     width: "640",
//     playerVars: {
//       autoplay: 1,
//     },
//   };

//   return <YouTube videoId="h2lEk7PkQic" opts={opts} onReady={onPlayerReady} />;
// }

import React from "react";
import YouTube from "react-youtube";
import { parse } from "url";

const getYouTubeId = (url: string): string | null => {
  const youtubeUrl = parse(url, true);
  const { hostname, pathname, query } = youtubeUrl;
  const isYouTube =
    (hostname === "www.youtube.com" || hostname === "youtube.com") &&
    pathname === "/watch";
  const youtubeId = query.v;

  return isYouTube && youtubeId ? youtubeId.toString() : null;
};

const YouTubePlayer: React.FC<{ url: string }> = ({ url }) => {
  const youtubeId = getYouTubeId(url);

  if (!youtubeId) {
    return <div>Invalid YouTube URL</div>;
  }

  const opts = {
    height: "360",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return <YouTube videoId={youtubeId} opts={opts} />;
};

export default YouTubePlayer;
