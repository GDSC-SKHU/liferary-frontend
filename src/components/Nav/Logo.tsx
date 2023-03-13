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
  width: 18vw;
  height: auto;

  margin-top: 3.7vh;
  margin-left: 3vw;
  margin-right: 3vw;

  display: inline-block;
`;
