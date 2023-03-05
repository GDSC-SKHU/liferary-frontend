import styled from "styled-components";

export default function User_infoForm() {
  return (
    <Container>
      <StyledDiv>
        <StyledP>Full name</StyledP>
        <StyledH2>Babo Shake it</StyledH2>
        <StyledP>Telephone</StyledP>
        <StyledH3>1-206-123-4567</StyledH3>
        <StyledP>E-mail</StyledP>
        <StyledH4>babo@gmail.com</StyledH4>
      </StyledDiv>
      <StyledDiv2>
        <StyledP>Full name</StyledP>
        <StyledH2>Babo Shake it</StyledH2>
        <StyledP>Telephone</StyledP>
        <StyledH3>1-206-123-4567</StyledH3>
        <StyledP>E-mail</StyledP>
        <StyledH4>babo@gmail.com</StyledH4>
      </StyledDiv2>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 20vw;
`;

const StyledDiv = styled.div`
  width: 20vw;
  height: 50vh;
  margin-top: 15vh;
  padding: 0 2vw;

  border: 1px solid #bfbfbf;
  border-radius: 10px;
  box-shadow: 1px 1px 7px #abaaaa;
`;

const StyledP = styled.p`
  margin-top: 1.5rem;

  color: var(--color-main);
  opacity: 0.5;

  font-weight: 600;
`;

const StyledH2 = styled.h2`
  color: var(--color-main);
`;
const StyledH3 = styled.h3`
  color: var(--color-main);
`;
const StyledH4 = styled.h4`
  color: var(--color-main);
`;

const StyledDiv2 = styled.div`
  width: 38vw;
  height: 50vh;
  margin-top: 15vh;
  padding: 0 2vw;

  border: 1px solid #bfbfbf;
  border-radius: 10px;
  box-shadow: 1px 1px 7px #abaaaa;
`;
