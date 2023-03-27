import styled from "styled-components";
import ShareForm from "./ShareForm";
import { ShareProps } from "@/pages/share";
import Recruit from "./Recruit";
import Community from "./Community";

export default function ShareBody({ id }: ShareProps) {
  return (
    <div>
      <ShareForm id={id} />
      <Wrapper2>
        <Wrapper>
          <Recruit id={id} />
          <Community id={id} />
        </Wrapper>
      </Wrapper2>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 65vw;
`;

const Wrapper2 = styled.div`
  display: flex;
  justify-content: center;

  margin: 0 17.5rem;
`;
