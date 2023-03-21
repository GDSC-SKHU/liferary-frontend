import styled from "styled-components";
import Post from "../../types/postType";
import { useRouter } from "next/router";
import ListItem from "./ListItem";
export default function ListTable({
  list,
  page,
}: {
  list: Post[];
  page: number;
}) {
  const router = useRouter();
  const handleClickListItem = (id: string) => {
    router.push(`http://localhost:3000/share?id=${id}`);
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
        <ListWrapper key={el.id} onClick={() => handleClickListItem(el.id)}>
          <ListItem
            idx={(page - 1) * 9 + idx + 1}
            title={el.title}
            nickname={el.nickname}
            modifiedDate={el.modifiedDate}
          />
        </ListWrapper>
      ))}
    </ListContainer>
  );
}

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 70%;
  height: 5vh;
  margin-top: 3vh;
  align-content: center;
  padding: 0 20px;
  transition: all 0.5s ease-in-out;
  :hover {
    transform: translateY(3px);
    color: var(--color-light);
  }
`;
const TitleWrapper = styled(ListWrapper)`
  background-color: var(--color-normal);
  color: white;
  border-radius: 10px;
  opacity: 0.5;
  font-size: 20px;
  height: 6vh;
`;
