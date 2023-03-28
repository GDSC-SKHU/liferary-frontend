import { ShareProps } from "@/pages/share";
import axios from "axios";
import router from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Board from "@/types/board";
import { Btn, Icon } from "./ShareForm";

export default function Comment({ id }: ShareProps) {
  const [list, setList] = useState<Board[]>();
  const onClickViewMoreBoard = () => {
    router.push({
      pathname: `/c_list/${id}`,
    });
  };
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
    <div>
      {/* {view !== undefined ? () : } */}
      <StyledH2>
        Share your feelings
        <Btn
          style={{ margin: "0", padding: "2px 5px" }}
          onClick={() => router.push(`/c_write?id=${id}`)}
          title="Ask any questions"
        >
          <Icon src="/Study.svg" />
        </Btn>
      </StyledH2>
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
      <Btn onClick={onClickViewMoreBoard} title="View more">
        <Icon src="/List.svg" />
      </Btn>
    </div>
  );
}

const StyledH2 = styled.h2`
  width: fit-content;
  margin-bottom: 1rem;
  padding: 10px;

  /* color: var(--color-main); */
  border-bottom: 2px solid var(--color-main);

  font-weight: normal;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CommunityBoardItem = styled.div`
  display: flex;
  width: 90%;
  margin-bottom: 1rem;
  padding: 0 5px 1rem;

  border-bottom: 1px solid black;

  :hover {
    color: var(--color-deep);
  }
`;
