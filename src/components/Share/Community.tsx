import router from "next/router";
import styled from "styled-components";

export default function Comment() {
  const onClickRouter = () => {
    router.push({
      pathname: `/c_list`,
      query: {
        id: router.query.id,
      },
    });
  };

  return (
    <Container>
      {/* {view !== undefined ? () : } */}
      <StyledH2 onClick={onClickRouter}>Share your feelings</StyledH2>
      <StyledImg onClick={onClickRouter} src="/Symbol.svg" />
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
