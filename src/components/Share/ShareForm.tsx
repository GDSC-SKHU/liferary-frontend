import useUser from "@/hooks/useUser";
import axios from "axios";
import { useRouter } from "next/router";
import { ShareProps } from "@/pages/share";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { formatDate } from "@/types/date";
import Image from "next/image";

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

  let ready = router.isReady;

  const [view, setView] = useState<ListProps>();

  const [videoView, setVideoView] = useState<string>();

  const onClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const TOKEN = localStorage.getItem("accessToken");
    if (confirm("Are you sure you want to delete it?")) {
      axios
        .delete(`/api/main/post/?id=${id}`, {
          headers: {
            withCredentials: true,
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .then(() => {
          //새로고침하면서 불러오기
          alert("Success Delete!");
          router.push("/");
        })
        .catch((e) => console.log(e));
    } else {
      return;
    }
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

    // if (validUrl(video)) {
    //   const urlObj = new URL(video);
    //   const videoId2 = urlObj.searchParams.get("v");
    //   if (videoId2) {
    //     setVideoView(videoView);
    //   }
    // }

    const getView = () => {
      const TOKEN = localStorage.getItem("accessToken");

      axios
        .get(`/api/main/post?id=${id}`)
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
  }, [ready, video]);

  useEffect(() => {
    view && view.video && setVideoView(extractVideoID(view.video as string));
  }, [view]);

  // const getIdFromUrl = (video: string) => {
  //   const match = video.match(/[?&]v=([^&]*)/);
  //   return match ? match[1] : null;
  // };

  // const videoId = getIdFromUrl(video);

  function extractVideoID(url: string) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[7].length == 11) {
      return match[7];
    }
  }

  const onClickRouter = () => {
    router.push({
      pathname: `/st_write`,
      query: {
        id: router.query.id,
      },
    });
  };

  return (
    <>
      {view !== undefined ? (
        <Container>
          <div>
            <StyledDiv>
              <StyledH2>{view.title}</StyledH2>
              {user?.nickname === view.nickname && (
                <div>
                  <Btn onClick={onClickUpdateRouter} title="Edit">
                    <Icon src="/Edit.svg" />
                  </Btn>
                  <Btn onClick={onClickDelete} title="Delete">
                    <Icon src="/Delete.svg" />
                  </Btn>
                  <Btn onClick={onClickRouter} title="Create study">
                    <Icon src="/Study.svg" />
                  </Btn>
                </div>
              )}
            </StyledDiv>
            <TimeContainer>
              <DateP style={{ color: "black" }}>
                <span style={{ marginRight: "1rem" }}>
                  {formatDate(view?.modifiedDate!)}
                </span>
                <Middot src="/middot.svg" />
                <Info style={{ marginRight: "1rem" }}> {view?.nickname}</Info>
                <Middot src="/middot.svg" />
                <Info2 onClick={() => onClickCategory(view?.category)}>
                  {view?.category}
                </Info2>
                <Description>*Click here to view by category!</Description>
              </DateP>
            </TimeContainer>
          </div>
          <StyledDiv2>
            <StyledP>{view.context}</StyledP>
            {view.images?.map((el) => (
              <ShareImage
                key={view.id}
                // src={`https://picsum.photos/200/300`}
                src={el}
                width={100}
                height={70}
                alt=""
              />
            ))}
            {videoView && (
              <Container2>
                <StyledTitle>YOUTUBE</StyledTitle>
                <Iframe
                  src={`https://www.youtube.com/embed/${videoView}`}
                  width="560"
                  height="315"
                  title="YouTube video player"
                  allowFullScreen
                />
                {/* <YouTube videoId={youtubeId} /> */}
                {/* {video && <YouTube videoId={video} />}
             <StyledSpan2>{view.video}</StyledSpan2> */}
              </Container2>
            )}
          </StyledDiv2>
        </Container>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ShareForm;

export const TimeContainer = styled.div`
  float: left;
  padding-top: 5px;
  padding-left: 10px;
`;

export const StyledSpan = styled.span`
  margin-left: 3vw;
`;

export const StyledBox = styled.div`
  display: inline-block;

  margin: 5px 5px 5px 0.3vw;
  padding: 1px 7px;

  background-color: var(--color-deep);
  color: white;
  border-radius: 5px;

  font-size: 1rem;
  text-align: center;
`;

export const Btn = styled.button`
  margin: 0 5px;

  color: var(--color-deep);
  border: none;
  border-radius: 1rem;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const Icon = styled.img`
  width: 2vw;
  margin: 0;
`;

export const Middot = styled.img`
  width: 0.5vw;
`;

export const Info = styled.span`
  margin-left: 1rem;
`;

export const Info2 = styled(Info)`
  border-bottom: 1px solid black;
  cursor: default;

  :hover {
    color: var(--color-main);
  }
`;

export const DateP = styled.p`
  margin-bottom: 2rem;
  float: left;
  text-align: left;

  color: #f0f0f0;
  font-size: small;
`;

export const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;

  width: 55vw;
  min-height: fit-content;
  padding: 0 10px;
  padding-top: 1rem;

  border-top: 1px solid var(--color-normal);
`;

export const StyledDiv2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 55vw;
  margin-bottom: 1rem;

  background-color: white;
  border-radius: 10px;

  @media (max-width: 800px) {
    width: 30vw;
    height: auto;
    padding: 3px;
  }
`;

const Description = styled.span`
  margin-left: 1vw;

  color: var(--color-normal);
  font-size: small;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 2rem;

  color: white;
  cursor: default;
`;

const Container2 = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 1rem;

  border-bottom: 3px solid var(--color-normal);

  text-align: center;
`;

export const StyledH2 = styled.h2`
  height: fit-content;

  color: black;

  word-break: break-all;

  @media (max-width: 800px) {
    font-size: medium;
  }
`;

export const StyledP = styled.p`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0 10px 1rem;
  height: auto;

  color: #444444;
  border-bottom: 1px solid var(--color-normal);

  font-weight: 500;
  font-size: 1rem;
  white-space: pre-wrap;
`;

const StyledTitle = styled.span`
  margin-bottom: 1rem;

  color: var(--color-main);

  font-weight: 600;
  font-size: 1.4rem;
  text-align: center;
`;

const Iframe = styled.iframe`
  width: 55vw;
  height: 65vh;
  margin-top: 1rem;
`;

export const ShareImage = styled(Image)`
  width: 50%;
  height: 40%;
  margin-bottom: 1rem;

  border-radius: 10px;
  //cover
`;
