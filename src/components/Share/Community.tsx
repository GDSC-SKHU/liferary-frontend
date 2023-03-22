import { ShareProps } from "@/pages/share";
import axios from "axios";
import router from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Board from "@/types/board";

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
        Share your feelings{" "}
        <Submit onClick={() => router.push(`/c_write?id=${id}`)}>
          write your idea
        </Submit>
      </StyledH2>
      {list &&
        list.slice(0, 5).map((el: Board) => (
          <CommunityBoardItem
            onClick={() => handleClickListItem(el.id)}
            key={el.id}
          >
            {el.title}
          </CommunityBoardItem>
        ))}
      <button onClick={onClickViewMoreBoard}>View More</button>
    </div>
  );
}

const Submit = styled.button`
  margin: 0;
  padding: 0;
`;

const StyledH2 = styled.h2`
  width: fit-content;
  margin-bottom: 1rem;
  padding: 10px;

  color: var(--color-main);
  border-bottom: 1px solid var(--color-main);

  font-weight: 600;
`;

const StyledImg = styled.img`
  width: 20vw;
`;

const CommunityBoardItem = styled.div`
  display: flex;
  width: 90%;
  border-bottom: 0.5px solid var(--color-light);
  :hover {
    color: var(--color-deep);
  }
`;
