import useUser from "@/hooks/useUser";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CommunityProps } from "@/pages/community/[mainPostId]/[id]";
import Board from "@/types/board";
import { formatDate } from "@/types/date";
import CommunityComment from "./CommunityComment";
import useToken from "@/hooks/useToken";
import {
  Btn,
  Container,
  DateP,
  ShareImage,
  TimeContainer,
} from "../Share/ShareForm";
import { Category, StyledName } from "../Study/StudyForm";
import {
  StyledBox,
  StyledDiv,
  StyledDiv2,
  StyledH2,
  StyledP,
  StyledSpan,
} from "../Share/ShareForm";

const CommunityForm = ({ mainPostId, id }: CommunityProps) => {
  const { allToken } = useToken();
  const router = useRouter();
  const { user } = useUser();

  let ready = router.isReady;

  const [view, setView] = useState<Board>();

  const onClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (confirm("Are you sure you want to delete it?")) {
      axios
        .delete(`/api/board/${mainPostId}/post/?id=${id}`, {
          headers: {
            withCredentials: true,
            Authorization: allToken,
          },
        })
        .then(() => {
          //새로고침하면서 불러오기
          alert("Success Delete!");
          // return false;
          router.push(`/c_list/${mainPostId}`);
        })
        .catch((e) => console.log(e));
    } else {
      return;
    }
  };

  const onClickUpdateRouter = () => {
    router.push({
      pathname: `/c_edit`,
      query: {
        mainPostId,
        id,
      },
    });
  };

  useEffect(() => {
    console.log(ready);

    const getView = () => {
      const TOKEN = localStorage.getItem("accessToken");

      axios
        .get(`/api/board/${mainPostId}/post/?id=${id}`, {
          headers: {
            Authorization: allToken,
            withCredentials: true,
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
  }, [ready]);

  return (
    <>
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
              <Btn onClick={onClickUpdateRouter}>Update</Btn>
              <Btn onClick={onClickDelete}>Delete</Btn>
            </div>
          )}
          <div>
            <StyledDiv>
              <StyledH2>{view.title}</StyledH2>
            </StyledDiv>
            <TimeContainer>
              <DateP style={{ color: "#8e8e8e" }}>
                {formatDate(view?.modifiedDate!)}
              </DateP>
            </TimeContainer>
          </div>
          <StyledDiv2>
            <StyledP>{view.context}</StyledP>
          </StyledDiv2>
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
          <CommunityComment boardPostId={view.id} />
        </Container>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default CommunityForm;
