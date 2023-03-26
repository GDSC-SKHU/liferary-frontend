import styled from "styled-components";
import Post from "../../types/postType";
import { formatDate } from "../../types/date";

interface ListProps extends Partial<Post> {
  idx: number;
}

export default function ListItem({
  idx,
  title,
  nickname,
  modifiedDate,
}: ListProps) {
  return (
    <>
      <StyledSpan>{idx}</StyledSpan>
      <StyledSpan>{title}</StyledSpan>
      <StyledSpan>{nickname}</StyledSpan>
      <StyledSpan>{formatDate(modifiedDate!)}</StyledSpan>
    </>
  );
}

const StyledSpan = styled.div`
  border-bottom: 1px solid var(--color-main);
`;
