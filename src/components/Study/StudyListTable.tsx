import { useRouter } from "next/router";
import ListItem from "../Commons/ListItem";
import Study from "@/types/study";
import { ListContainer, ListWrapper, TitleWrapper } from "../Commons/ListTable";

export default function StudyListTable({
  list,
  page,
  totalElements,
}: {
  list: Study[];
  page: number;
  totalElements: number;
}) {
  const router = useRouter();
  const handleClickListItem = (mainPostId: number) => {
    router.push({
      pathname: "study",
      query: {
        id: mainPostId,
      },
    });
  };

  return (
    <ListContainer>
      <TitleWrapper>
        <span>Index</span>
        <span>Title</span>
        <span>Name</span>
        <span>Date</span>
      </TitleWrapper>
      {list.map((el: Study, idx) => (
        <ListWrapper
          key={el.id}
          onClick={() => handleClickListItem(el.mainPostId)}
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
