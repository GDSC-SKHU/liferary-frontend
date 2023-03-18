import styled from "styled-components";
import Satisfy from "./Satisfy";
import ShareForm from "./ShareForm";
import Comment from "./Community";
import { ShareProps } from "@/pages/share";
import Recruit from "./Recruit";
import Community from "./Community";

export default function ShareBody({ id }: ShareProps) {
  return (
    <>
      <ShareForm id={id} />
      <Satisfy />
      <Container>
        <Recruit id={id} />
        <Community />
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
