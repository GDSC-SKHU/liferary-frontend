import useUser from "@/hooks/useUser";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { CommunityProps } from "@/pages/community/[mainPostId]/[id]";
import Board from "@/types/board";
import { formatDate } from "@/types/date";
import CommunityComment from "./CommunityComment";

const CommunityForm = ({ mainPostId, id }: CommunityProps) => {
  const router = useRouter();
  const { user } = useUser();

  let ready = router.isReady;

  const [view, setView] = useState<Board>();

  const onClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const TOKEN = localStorage.getItem("accessToken");
    axios
      .delete(`/api/board/${mainPostId}/post/?id=${id}`, {
        headers: {
          withCredentials: true,
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then(() => {
        //새로고침하면서 불러오기
        if (confirm("Are you sure you want to delete it?")) {
          router.push(`/c_list/${mainPostId}`);
          alert("Success Delete!");
          // return false;
        } else {
          router.push(`/c_list/${mainPostId}`);
        }
      })
      .catch((e) => console.log(e));
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
        본문으로 가기
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
          <CommunityComment boardPostId={view.id} />
        </Container>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default CommunityForm;

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

const StyledH2 = styled.h2`
  color: white;

  @media (max-width: 800px) {
    font-size: medium;
  }
`;
