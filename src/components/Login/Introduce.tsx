import Link from "next/link";
import styled from "styled-components";

export default function Introduce() {
  return (
    <>
      <Container>
        <h2>Hi, We are Liferary.</h2>
        <StyledP>If you don&apos;t have an id,</StyledP>
        <StyledP>please sign up first.</StyledP>
        <StyledP>Thank you.</StyledP>
        <Link href={"/signup"}>
          <StyledBtn>Sign up here</StyledBtn>
        </Link>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 40%;
  height: 100vh;
  float: right;

  padding-top: 37vh;
  padding-left: 12vw;

  background-color: var(--color-main);
  color: white;

  @media (max-width: 800px) {
    padding-left: 8vw;
  }
`;

const StyledP = styled.p`
  line-height: 200%;
`;

const StyledBtn = styled.button`
  margin-left: 10vw;

  background-color: var(--color-main);
  color: white;
  border: 1px solid white;
  border-radius: 7px;

  cursor: pointer;

  &:hover {
    background-color: white;
    color: var(--color-main);
  }
`;
