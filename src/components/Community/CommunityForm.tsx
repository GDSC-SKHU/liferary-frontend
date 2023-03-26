import useUser from "@/hooks/useUser";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CommunityProps } from "@/pages/community/[mainPostId]/[id]";
import Board from "@/types/board";
import { formatDate } from "@/types/date";
import CommunityComment from "./CommunityComment";
import useToken from "@/hooks/useToken";
import { Container, ShareImage } from "../Share/ShareForm";
import {
  Category,
  StyledBox,
  StyledDiv,
  StyledDiv2,
  StyledH2,
  StyledName,
  StyledP,
  StyledSpan,
} from "../Study/StudyForm";

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
      <button
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
      </button>
      <Category>
        <StyledSpan>Write time: </StyledSpan>
        <span>{formatDate(view?.modifiedDate!)}</span>
        <br />
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
          <CommunityComment boardPostId={view.id} />
        </Container>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default CommunityForm;
