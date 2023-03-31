import { ShareProps } from "@/pages/share";
import axios from "axios";
import router from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Board from "@/types/board";

export default function Comment({ id }: ShareProps) {
  const [isExist, setIsExist] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`/api/community?mainPost=${id}`)
      .then((res) => res.status === 200 && setIsExist(true))
      .catch((err) => console.log(err));
  });

  const [list, setList] = useState<Board[]>();

  const handleClickListItem = (boardId: number) => {
    router.push(`/community/${id}/${boardId}`);
  };

  console.log(list?.slice(0, 5));

  useEffect(() => {
    axios
      .get(`/api/board/${id}/page?page=1`)
      .then((data) => setList(data.data.content));
  }, []);

  return (
    // <div onClick={onClickReadRouter}>
    //   {isExist ? (
    <Wrapper>
      <StyledH2>Share your feelings</StyledH2>
      <Container>
        {list &&
          list.slice(0, 5).map((el: Board) => (
            <CommunityBoardItem
              onClick={() => handleClickListItem(el.id)}
              key={el.id}
            >
              {el.title}
            </CommunityBoardItem>
          ))}
      </Container>
    </Wrapper>
    // ) : (
    //   <>
    //     <StyledH2 style={{ padding: "0 3rem" }}>No Post Yet</StyledH2>
    //     <>Please wait . . .</>
    //   </>
    // )}
    // </div>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 50%;
`;
const StyledH2 = styled.h2`
  /* width: fit-content; */
  margin-bottom: 1rem;
  padding: 10px;

  border-bottom: 2px solid var(--color-main);

  font-weight: normal;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
`;

const CommunityBoardItem = styled.div`
  display: flex;
  width: 90%;
  margin-bottom: 1rem;
  padding: 0 5px 1rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  border-bottom: 1px solid black;

  :hover {
    color: var(--color-deep);
  }
`;
