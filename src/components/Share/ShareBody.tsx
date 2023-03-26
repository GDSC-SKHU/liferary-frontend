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
        <Recruit id={id} />
        <Community id={id} />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 0 23vw;
`;
