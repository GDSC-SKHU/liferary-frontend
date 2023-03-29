import styled from "styled-components";
import ShareForm from "./ShareForm";
import { ShareProps } from "@/pages/share";
import Recruit from "./Recruit";
import Community from "./Community";

export default function ShareBody({ id }: ShareProps) {
  return (
    <>
      <ShareForm id={id} />
      <Container>
        <Wrapper>
          <Recruit id={id} />
          <Community id={id} />
        </Wrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 55vw;
  cursor: default;
`;
