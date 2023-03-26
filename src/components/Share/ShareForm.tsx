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
      <div>
        <Wrapper>
          <div>
            <StyledSpan>Category: </StyledSpan>
            <StyledBox2>
              <p onClick={() => onClickCategory(view?.category)}>
                {view?.category}
              </p>
            </StyledBox2>
          </div>
          <br />
          <TimeContainer>
            <StyledSpan>Write time: </StyledSpan>
            <StyledBox>
              <span>{formatDate(view?.modifiedDate!)}</span>
            </StyledBox>
          </TimeContainer>
        </Wrapper>
        <Description>*Click here to view by category! </Description>{" "}
      </div>
      <div>
        <StyledSpan>Username: </StyledSpan>
        <StyledBox>
          <p>{view?.nickname}</p>
        </StyledBox>
      </div>
      {view !== undefined ? (
        <Container>
          {user?.nickname === view.nickname && (
            <div>
              <Btn onClick={onClickUpdateRouter}>Update</Btn>
              <Btn onClick={onClickDelete}>Delete</Btn>
            </div>
          )}
          <StyledDiv>
            <StyledH2>{view.title}</StyledH2>
          </StyledDiv>
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
          {user?.nickname === view.nickname && (
            <div>
              <Btn onClick={onClickRouter}>Write Study</Btn>
            </div>
          )}
        </Container>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ShareForm;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TimeContainer = styled.div`
  margin-right: 3vw;
`;

const StyledSpan = styled.span`
  margin-left: 3vw;
`;

const StyledBox = styled.div`
  display: inline-block;

  margin: 5px 5px 5px 0.3vw;
  padding: 1px 7px;

  background-color: var(--color-deep);
  color: white;
  border-radius: 5px;

  font-size: 1rem;
  text-align: center;
`;

const StyledBox2 = styled(StyledBox)`
  cursor: pointer;

  transition: 0.3s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Btn = styled.button`
  margin: 0 1rem;
  margin-bottom: 1rem;
  padding: 5px 10px;

  background-color: white;
  color: var(--color-deep);
  border: none;
  border: 1px solid var(--color-deep);

  transition: 0.3s;

  &:hover {
    transform: translateY(-3px);
  }
`;

const StyledDiv = styled.div`
  width: fit-content;
  /* 45vw */
  min-height: fit-content;
  margin-bottom: 1rem;
  padding: 0 10px;

  background-color: var(--color-normal);
  border-bottom: 1px solid var(--color-normal);
  color: white;
  border-radius: 5px;

  text-align: center;
  /* box-shadow: 0 2px 5px #777777; */

  @media (max-width: 800px) {
    width: 30vw;
    height: auto;
    padding: 3px;
  }
`;

const StyledDiv2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 45vw;
  margin-bottom: 1rem;

  background-color: white;
  border-radius: 10px;

  @media (max-width: 800px) {
    width: 30vw;
    height: auto;
    padding: 3px;
  }
`;

const Description = styled.p`
  margin-left: 3vw;

  color: var(--color-normal);
  font-size: small;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: white;

  /* ::selection {
    background-color: pink;
  } */
`;

const Container2 = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 1rem;

  border-bottom: 3px solid var(--color-normal);

  text-align: center;
`;

const StyledH2 = styled.h2`
  height: fit-content;

  font-weight: 500;
  word-break: break-all;

  @media (max-width: 800px) {
    font-size: medium;
  }
`;

const StyledP = styled.p`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0 10px 1rem;
  height: auto;

  color: #444444;
  border-bottom: 3px solid var(--color-normal);

  font-weight: 500;
  font-size: 1rem;
  word-break: break-all;
`;

const StyledTitle = styled.span`
  margin-bottom: 1rem;

  color: var(--color-main);

  font-weight: 600;
  font-size: 1.4rem;
  text-align: center;
`;

const Iframe = styled.iframe`
  width: 45vw;
  margin-top: 1rem;
`;

export const ShareImage = styled(Image)`
  width: 50%;
  height: 40%;
  margin-bottom: 1rem;

  border-radius: 10px;
  //cover
`;
