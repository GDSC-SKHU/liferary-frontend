import styled from "styled-components";
// import Satisfy from "./Satisfy";
import ShareForm from "./ShareForm";
import { ShareProps } from "@/pages/share";
import Recruit from "./Recruit";
import Community from "./Community";

export default function ShareBody({ id }: ShareProps) {
  return (
    <>
      <ShareForm id={id} />
      {/* <Satisfy /> */}
      <Container>
        <Recruit />
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
