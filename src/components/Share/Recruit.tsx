import { ShareProps } from "@/pages/share";
import router from "next/router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Recruit({ id }: ShareProps) {
  const [isExist, setIsExist] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`/api/study?mainPost=${id}`)
      .then((res) => res.status === 200 && setIsExist(true))
      .catch((err) => console.log(err));
  });

  const onClickReadRouter = () => {
    router.push({
      pathname: `/study`,
      query: {
        id: id,
      },
    });
  };

  return (
    <Container>
      {isExist ? (
        <StudyContainer onClick={onClickReadRouter}>
          <StyledH2>Check out your study!</StyledH2>
          <StyledImg src="/book.png" />
        </StudyContainer>
      ) : (
        <>
          <StyledH2 style={{ padding: "0 3rem" }}>No Study Yet</StyledH2>
          <>Please wait . . .</>
        </>
      )}
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

const StudyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledH2 = styled.h2`
  width: fit-content;
  margin-bottom: 1rem;
  padding: 10px;

  border-bottom: 2px solid var(--color-main);

  font-weight: normal;
`;

const StyledImg = styled.img`
  width: 20vw;

  transition: transform 0.3s;

  &:hover {
    transform: translateY(-4px);
  }
`;
