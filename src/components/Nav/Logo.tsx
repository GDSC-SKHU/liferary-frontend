import Link from "next/link";
import styled from "styled-components";

export default function Logo() {
  return (
    <>
      <Link href={"/"}>
        <StyledImg src="/Logo2.svg" />
      </Link>
    </>
  );
}

const StyledImg = styled.img`
  display: inline-block;

  width: 18vw;
  height: auto;
  margin-top: 3.7vh;
  margin-right: 3vw;
  margin-left: 3vw;
`;
