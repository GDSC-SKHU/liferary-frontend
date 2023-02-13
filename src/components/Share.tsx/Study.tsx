import styled from 'styled-components';

export default function Study() {
  return (
    <Container>
      <StyledH2>Check out your study!</StyledH2>
      <StyledImg src="/Symbol.svg" />
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

  color: #4285f4;
  border-bottom: 1px solid #4285f4;
  font-weight: 600;
`;

const StyledImg = styled.img`
  width: 20vw;
`;
