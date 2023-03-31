import useUser from "@/hooks/useUser";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CommunityProps } from "@/pages/community/[mainPostId]/[id]";
import Board from "@/types/board";
import { formatDate } from "@/types/date";
import CommunityComment from "./CommunityComment";
import {
  Btn,
  Container,
  DateP,
  Icon,
  Info,
  Middot,
  ShareImage,
  TimeContainer,
} from "../Share/ShareForm";
import { StyledDiv, StyledDiv2, StyledH2, StyledP } from "../Share/ShareForm";

const CommunityForm = ({ mainPostId, id }: CommunityProps) => {
  const router = useRouter();
  const { user } = useUser();

  let ready = router.isReady;

  const [view, setView] = useState<Board>();

  const onClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const TOKEN = localStorage.getItem("accessToken");
    if (confirm("Are you sure you want to delete it?")) {
      axios
        .delete(`/api/board/${mainPostId}/post/?id=${id}`, {
          headers: {
            withCredentials: true,
            Authorization: `Bearer ${TOKEN}`,
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
        .get(`/api/board/${mainPostId}/post/?id=${id}`)
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
      {view !== undefined ? (
        <Container>
          <div>
            <StyledDiv>
              <StyledH2>{view.title}</StyledH2>
              {user?.nickname === view.nickname ? (
                <div>
                  <Btn onClick={onClickUpdateRouter} title="Edit">
                    <Icon src="/Edit.svg" />
                    <span>Edit</span>
                  </Btn>
                  <Btn onClick={onClickDelete} title="Delete">
                    <Icon src="/Delete.svg" />
                    <p>Delete</p>
                  </Btn>
                  <Btn
                    title="Go to body"
                    onClick={() =>
                      router.push({
                        pathname: "/share",
                        query: {
                          id: view?.mainPostId,
                        },
                      })
                    }
                  >
                    <Icon src="/Prev.svg" />
                    <p>Back</p>
                  </Btn>
                </div>
              ) : (
                <Btn
                  title="Go to body"
                  onClick={() =>
                    router.push({
                      pathname: "/share",
                      query: {
                        id: view?.mainPostId,
                      },
                    })
                  }
                >
                  <Icon src="/Prev.svg" />
                </Btn>
              )}
            </StyledDiv>
            <TimeContainer>
              <DateP style={{ color: "black" }}>
                <span style={{ marginRight: "1rem" }}>
                  {formatDate(view?.modifiedDate!)}
                </span>
                <Middot src="/middot.svg" />
                <Info style={{ marginRight: "1rem" }}> {view?.nickname}</Info>
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
          <CommunityComment boardPostId={view.id} />
        </Container>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default CommunityForm;
