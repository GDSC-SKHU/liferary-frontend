import useUser from "@/hooks/useUser";
import { formatDate } from "@/types/date";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import {
  Btn,
  Container,
  DateP,
  ShareImage,
  StyledBox,
  StyledDiv,
  StyledDiv2,
  StyledH2,
  StyledP,
  StyledSpan,
  TimeContainer,
} from "../Share/ShareForm";

interface ViewProps {
  mainPostId: string;
  id: string;
  title: string;
  nickname: string;
  context: string;
  images: string[];
  modifiedDate: string;
}

const StudyForm = () => {
  // https://velog.io/@hhhminme/Next.js%EC%97%90%EC%84%9C-SSR%EB%A1%9C-url-query-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0feat.-typescript
  // https://velog.io/@wlgns2223/Next.JS-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EC%BF%BC%EB%A6%AC-undefined-%EC%9D%B4%EC%8A%88

  const router = useRouter();
  const { user } = useUser();

  const id = router.query.id;

  console.log(id);

  let ready = router.isReady;

  const [view, setView] = useState<ViewProps>();

  const [googlemeetLink, setGooglemeetLink] = useState<string>();

  const onClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const TOKEN = localStorage.getItem("accessToken");

    if (confirm("Are you sure you want to delete it?")) {
      axios
        .delete(`/api/study?mainPost=${id}`, {
          headers: {
            withCredentials: true,
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .then(() => {
          //새로고침하면서 불러오기
          alert("Success Delete!");
          // return false;
          router.push(`/share?id=${id}`);
        })
        .catch((e) => console.log(e));
    } else {
      return;
    }
  };

  const onClickUpdateRouter = () => {
    router.push({
      pathname: "/st_edit",
      query: {
        id: router.query.id,
      },
    });
  };

  useEffect(() => {
    console.log(ready);

    const getView = () => {
      const TOKEN = localStorage.getItem("accessToken");
      axios
        .get(`/api/study?mainPost=${id}`)
        .then((data) => {
          console.log(TOKEN);
          console.log(data.data);
          console.log(data.data.nickname);

          setView(data.data);
        })
        .catch((e) => {
          alert(e);
          // alert("Failed to look up");
          console.log(TOKEN);
          console.log(e);
        });
    };
    ready ? getView() : null;
  }, [ready]);

  useEffect(() => {
    const formatted = view?.context.match(
      /https:\/\/meet\.google\.com\/[^\s]+/g
    );

    console.log("formatted", formatted);
    formatted && setGooglemeetLink(formatted[0]);
    // setFormattedText(formatted);
    // console.log(formattedText);
  }, [view]);

  return (
    <>
      <div style={{ margin: "1rem 0" }}>
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
          <div>
            <StyledDiv>
              <StyledH2>{view.title}</StyledH2>
            </StyledDiv>
            <TimeContainer>
              <DateP style={{ color: "black" }}>
                {formatDate(view?.modifiedDate!)}
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
          </StyledDiv2>
          {googlemeetLink && (
            <GoogleMeetLink href={googlemeetLink} target={"_blank"}>
              Go To GOOGLE MEET and study
            </GoogleMeetLink>
          )}
          <Btn
            onClick={() =>
              router.push({
                pathname: "/share",
                query: {
                  id: view?.mainPostId,
                },
              })
            }
          >
            Go to body
          </Btn>
        </Container>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default StudyForm;

export const Category = styled.div`
  margin-top: 2rem;
`;

export const StyledName = styled.p`
  @media (max-width: 800px) {
    font-size: 0.7em;
  }
`;

const GoogleMeetLink = styled(Link)`
  margin-bottom: 1rem;

  color: black;

  transition: 0.2s;

  :hover {
    transform: translateY(-2px);
    color: #888888;
  }
`;
