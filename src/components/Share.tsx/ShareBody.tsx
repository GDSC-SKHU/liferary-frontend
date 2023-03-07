import styled from "styled-components";
import Satisfy from "./Satisfy";
import ShareForm from "./ShareForm";
import Study from "./Study";
import Comment from "./Comment";
import { ShareProps } from "@/pages/share";

export default function ShareBody({ id }: ShareProps) {
  return (
    <>
      <ShareForm id={id} />
      <Satisfy />
      <Container>
        <Study />
        <Comment />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 0 25vw;
`;
