import Link from "next/link";
import { Container, StyledBtn, StyledP } from "../Signup/Ment";

export default function Introduce() {
  return (
    <>
      <Container style={{ float: "right" }}>
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
