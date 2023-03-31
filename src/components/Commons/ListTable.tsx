import styled from "styled-components";
import Post from "../../types/postType";
import { useRouter } from "next/router";
import ListItem from "./ListItem";

export default function ListTable({
  list,
  page,
  totalElements,
}: {
  list: Post[];
  page: number;
  totalElements: number;
}) {
  const router = useRouter();
  const handleClickListItem = (id: string) => {
    router.push(`/share?id=${id}`);
  };

  return (
    <ListContainer>
      <TitleWrapper>
        <span>Index</span>
        <span>Title</span>
        <span>Name</span>
        <span>Date</span>
      </TitleWrapper>
      {list.map((el: Post, idx) => (
        <ListWrapper
          key={(el.id, el.title, el.nickname, el.modifiedDate)}
          onClick={() => handleClickListItem(el.id)}
        >
          <ListItem
            idx={totalElements - ((page - 1) * 9 + idx)}
            title={el.title}
            nickname={el.nickname}
            modifiedDate={el.modifiedDate}
          />
        </ListWrapper>
      ))}
    </ListContainer>
  );
}

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-top: 1rem;
`;

export const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 2fr 0.8fr 0.8fr;

  width: 70%;
  /* height: 4vh; */
  /* margin-top: 2vh; */
  padding-left: 10px;
  padding-top: 20px;

  border: none;

  align-content: center;
  transition: all 0.3s ease-in-out;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  cursor: default;

  border-bottom: 1px solid #d3d3d3;

  :hover {
    color: var(--color-main);
  }
`;

export const TitleWrapper = styled(ListWrapper)`
  height: 5vh;
  padding-bottom: 1.2rem;

  border-bottom: 2px solid var(--color-main);

  font-size: 20px;

  :hover {
    transform: none;
    color: black;
  }
`;
