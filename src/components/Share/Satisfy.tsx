import { useState } from "react";
import styled from "styled-components";

export default function Satisfy() {
  const [count, setCount] = useState<number>(0);

  console.log(count);

  if (count < 0) {
    setCount(0);
  }

  return (
    <>
      <Container>
        <StyledDiv>
          <StyledH2>How was our service?</StyledH2>
        </StyledDiv>
        <Container2>
          <StyledArticle>
            <StyledBtn onClick={() => setCount((prev) => prev + 1)} />
            <StyledSpan>Good</StyledSpan>
          </StyledArticle>
          <StyledArticle>
            <StyledBtn onClick={() => setCount((prev) => prev - 1)} />
            <StyledSpan>Bad</StyledSpan>
          </StyledArticle>
        </Container2>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-bottom: 2rem;

  color: white;
`;

const StyledDiv = styled.div`
  width: 22vw;
  height: 7vh;
  margin-bottom: 1rem;

  background-color: var(--color-light);
  border-radius: 5px;

  text-align: center;

  @media (max-width: 800px) {
    width: 30vw;
    height: auto;
    padding: 3px;
  }
`;

const StyledH2 = styled.h2`
  @media (max-width: 800px) {
    font-size: medium;
  }
`;

const Container2 = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;

  width: 30vw;
  height: 30vh;

  background-color: white;
  color: var(--color-main);
  border-radius: 10px;

  box-shadow: 2px 2px 5px #333333;

  @media (max-width: 800px) {
    width: 30vw;
    padding: 3px;
  }
`;

const StyledArticle = styled.article`
  text-align: center;
`;

const StyledBtn = styled.button`
  width: 10vw;
  height: 20vh;
  margin-top: 1vh;
`;

const StyledSpan = styled.span`
  color: var(--color-main);

  font-weight: 600;
  font-size: large;
  text-align: center;
`;
