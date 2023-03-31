import { useRouter } from "next/router";
import ListItem from "../Commons/ListItem";
import Board from "@/types/board";
import { ListContainer, ListWrapper, TitleWrapper } from "../Commons/ListTable";

export default function CommunityListTable({
  list,
  page,
  totalElements,
}: {
  list: Board[];
  page: number;
  totalElements: number;
}) {
  const router = useRouter();
  const handleClickListItem = (mainPostId: number, id: number) => {
    router.push(`/community/${mainPostId}/${id}`);
  };

  return (
    <ListContainer>
      <TitleWrapper>
        <span>Index</span>
        <span>Title</span>
        <span>Name</span>
        <span>Date</span>
      </TitleWrapper>
      {list.map((el: Board, idx) => (
        <ListWrapper
          key={el.id}
          onClick={() => handleClickListItem(el.mainPostId, el.id)}
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
