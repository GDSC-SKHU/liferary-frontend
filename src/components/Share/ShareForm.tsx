import useUser from "@/hooks/useUser";
import axios from "axios";
import { useRouter } from "next/router";
import { ShareProps } from "@/pages/share";
import { useEffect, useState } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import { validUrl } from "@/libs/utils";

interface ListProps {
  id: string;
  title: string;
  nickname: string;
  category: string;
  context: string;
  images: string[];
  video: string;
  modifiedDate: string;
}

const ShareForm = ({ id }: ShareProps, { video }: ListProps) => {
  const router = useRouter();
  const { user } = useUser();
  console.log(router.query.video);

  let ready = router.isReady;

  const [view, setView] = useState<ListProps>();

  const [videoView, setVideoView] = useState("");

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const modifiedDate =
    month + "/" + date + "/" + year + " " + hours + ":" + minutes;

  const onClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const TOKEN = localStorage.getItem("accessToken");
    axios
      .delete(`/api/main/post/?id=${id}`, {
        headers: {
          withCredentials: true,
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then(() => {
        router.push("/");
      })
      .catch((e) => console.log(e));
  };

  const onClickUpdateRouter = () => {
    router.push({
      pathname: "/s_edit",
      query: {
        id: router.query.id,
      },
    });
  };

  // const getIdFromUrl = (url: string) => {
  //   const match = url.match(/[?&]v=([^&]*)/);
  //   return match ? match[1] : null;
  // };

  // const videoId = getIdFromUrl(video);

  // const youtubeId = video.split("v=")[1];

  const onClickCategory = (c: string | undefined) => {
    if (c) {
      router.push(`/category/${c.toLowerCase()}`);
    }
  };

  useEffect(() => {
    console.log(ready);

    if (validUrl(video)) {
      const urlObj = new URL(video);
      const videoId2 = urlObj.searchParams.get("v");
      if (videoId2) {
        setVideoView(videoView);
      }
    }

    const getView = () => {
      const TOKEN = localStorage.getItem("accessToken");

      axios
        .get(`/api/main/post?id=${id}`, {
          headers: {
            withCredentials: true,
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .then((data) => {
          console.log(TOKEN);
          console.log(data.data);
          console.log(data.data.nickname);

          setView(data.data);
        })
        .catch((e) => {
          alert("Failed to look up");
          console.log(TOKEN);
          console.log(e);
        });
    };
    ready ? getView() : null;
  }, [ready, video, router.query.url, router.query.video]);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
      controls: 1,
      modestbranding: 1,
      showinfo: 0,
      rel: 0,
      start: 0,
      end: 0,
    },
    video: video,
  };

  return (
    <div>
      <Category>
        <p>write time: {modifiedDate}</p>
        <StyledSpan>Category: </StyledSpan>
        <StyledBox>
          <StyledName onClick={() => onClickCategory(view?.category)}>
            {view?.category}
          </StyledName>
        </StyledBox>
      </Category>
      <div>
        <StyledSpan>Username: </StyledSpan>
        <StyledBox>
          <StyledName>{view?.nickname}</StyledName>
        </StyledBox>
      </div>
      {view !== undefined ? (
        <Container>
          {user?.nickname === view.nickname ? (
            <div>
              <button onClick={onClickUpdateRouter}>Update</button>
              <button onClick={onClickDelete}>delete</button>
              <StyledDiv>
                <StyledH2>{view.title}</StyledH2>
              </StyledDiv>
            </div>
          ) : (
            <StyledDiv>
              <StyledH2>{view.title}</StyledH2>
            </StyledDiv>
          )}
          <StyledDiv2>
            <StyledP>{view.context}</StyledP>
            <Container2>
              <StyledTitle>youtube link: </StyledTitle>
              <iframe
                src={`https://www.youtube.com/embed/${video}`}
                width="560"
                height="315"
                title="YouTube video player"
                allowFullScreen
              />
              {/* <YouTube videoId={youtubeId} /> */}
              {video && <YouTube videoId={video} />}
              <StyledSpan2>{view.video}</StyledSpan2>
              <p>{view.images}</p>
            </Container2>
          </StyledDiv2>
          {/* {videoId && (
            <YouTube
              videoId={videoId}
              opts={{ width: "100%", height: "500px" }}
            />
          )} */}
          <div>
            {videoView ? (
              <div>
                <YouTube opts={opts} />
              </div>
            ) : (
              <div>Invalid URL</div>
            )}
          </div>
        </Container>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ShareForm;

const Category = styled.div`
  margin-top: 2rem;
`;

const StyledSpan = styled.span`
  margin-left: 3vw;

  color: var(--color-main);

  font-weight: 600;
  font-size: large;
`;

const StyledBox = styled.div`
  display: inline-block;

  margin: 5px 5px 5px 0.3vw;
  padding: 1px 7px;

  background-color: var(--color-deep);
  color: white;
  border-radius: 5px;

  font-weight: 600;
  font-size: large;
  text-align: center;
`;

const StyledName = styled.p`
  @media (max-width: 800px) {
    font-size: 0.7em;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: white;
`;

const Container2 = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 1rem;

  border-bottom: 3px solid var(--color-normal);
`;

const StyledDiv = styled.div`
  width: 40vw;
  height: 7vh;

  margin-bottom: 1rem;

  background-color: var(--color-normal);
  border-radius: 10px;

  text-align: center;

  @media (max-width: 800px) {
    width: 30vw;
    height: auto;
    padding: 3px;
  }
`;

const StyledDiv2 = styled.div`
  width: 40vw;

  margin-bottom: 1rem;

  background-color: white;
  border-radius: 10px;

  text-align: justify;

  @media (max-width: 800px) {
    width: 30vw;
    height: auto;

    padding: 3px;
  }
`;

const StyledP = styled.p`
  margin-bottom: 1rem;
  padding-bottom: 1rem;

  color: #666666;
  border-bottom: 3px solid var(--color-normal);

  font-weight: 500;
  font-size: 1.4rem;

  @media (max-width: 800px) {
    font-size: medium;
  }
`;

const StyledSpan2 = styled.span`
  color: #666666;

  font-weight: 500;
  font-size: 1.4rem;

  @media (max-width: 800px) {
    font-size: medium;
  }
`;

const StyledTitle = styled.span`
  color: var(--color-main);

  font-weight: 500;
  font-size: 1.4rem;

  @media (max-width: 800px) {
    font-size: medium;
  }
`;

const StyledH2 = styled.h2`
  @media (max-width: 800px) {
    font-size: medium;
  }
`;
