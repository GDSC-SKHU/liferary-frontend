import Link from "next/link";
import styled from "styled-components";

export default function Ment() {
  return (
    <>
      <Container>
        <h2>Hi, We are Liferary.</h2>
        <StyledP>If you have an id,</StyledP>
        <StyledP>please login.</StyledP>
        <StyledP>Thank you.</StyledP>
        <Link href={"/login"}>
          <StyledBtn>Login here</StyledBtn>
        </Link>
      </Container>
    </>
  );
}

export const Container = styled.div`
  width: 40%;
  height: 100vh;
  float: left;
  padding-top: 37vh;
  padding-left: 11vw;

  background-color: var(--color-main);
  color: white;

  cursor: default;

  @media (max-width: 800px) {
    padding-left: 10vw;
  }
`;

export const StyledP = styled.p`
  line-height: 200%;
`;

export const StyledBtn = styled.button`
  float: right;
  margin-right: 12vw;

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
