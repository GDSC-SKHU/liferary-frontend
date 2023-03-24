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
  console.log(router.query.video);

  let ready = router.isReady;

  const [view, setView] = useState<ListProps>();

  const [videoView, setVideoView] = useState<string>();

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

  return (
    <div>
      <Category>
        <StyledSpan>Write time: </StyledSpan>
        <span>{formatDate(view?.modifiedDate!)}</span>
        <br />
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
          {user?.nickname === view.nickname && (
            <div>
              <button onClick={onClickUpdateRouter}>Update</button>
              <button onClick={onClickDelete}>delete</button>
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
                src={`https://picsum.photos/200/300`}
                // src={el}
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
            <p>{view.images}</p>
          </StyledDiv2>
          {/* {videoId && (
            <YouTube
              videoId={videoId}
              opts={{ width: "100%", height: "500px" }}
            />
          )} */}

          {/* {videoId && (
            <YouTube
              videoId={videoId}
              opts={{ width: "100%", height: "500px" }}
            />
          )} */}
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

const StyledDiv = styled.div`
  width: 45vw;
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
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 45vw;
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

  text-align: center;
`;

const StyledH2 = styled.h2`
  @media (max-width: 800px) {
    font-size: medium;
  }
`;

const StyledP = styled.p`
  width: 100%;
  margin-bottom: 1rem;
  padding-bottom: 1rem;

  color: #666666;
  border-bottom: 3px solid var(--color-normal);

  font-weight: 500;
  font-size: 1rem;

  @media (max-width: 800px) {
    font-size: medium;
  }
`;

const StyledTitle = styled.span`
  margin-bottom: 1rem;

  color: var(--color-main);

  font-weight: 600;
  font-size: 1.4rem;
  text-align: center;

  @media (max-width: 800px) {
    font-size: medium;
  }
`;

const Iframe = styled.iframe`
  width: 45vw;
  margin-top: 1rem;
`;

const ShareImage = styled(Image)`
  width: 100%;
  height: 70%;
  border-radius: 10px;
  //cover
`;
