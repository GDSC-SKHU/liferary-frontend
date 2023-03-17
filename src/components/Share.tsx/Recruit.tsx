import { ShareProps } from "@/pages/share";
import router from "next/router";
import styled from "styled-components";

export default function Recruit({ id }: ShareProps) {
  // console.log(router.query.id);

  const onClickRouter = () => {
    router.push({
      pathname: `/st_write`,
      query: {
        id: router.query.id,
      },
    });
  };

  const onClickReadRouter = () => {
    router.push({
      pathname: `/study`,
      query: {
        id: router.query.id,
      },
    });
  };

  return (
    <Container>
      {/* {view !== undefined ? () : } */}
      <StyledH2 onClick={onClickRouter}>Check out your study!</StyledH2>
      <StyledImg onClick={onClickReadRouter} src="/Symbol.svg" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-bottom: 10vh;
`;

const StyledH2 = styled.h2`
  width: fit-content;
  margin-bottom: 1rem;
  padding: 10px;

  color: var(--color-main);
  border-bottom: 1px solid var(--color-main);
  font-weight: 600;
`;

const StyledImg = styled.img`
  width: 20vw;
`;
