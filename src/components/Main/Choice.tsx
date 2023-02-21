import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import List from '../List';

const Choice = () => {
  const [isHide, setIsHide] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) setIsHide(false);
    else setIsHide(true);
  }, []);

  // useEffect(() => {
  //   if (sessionStorage.getItem('Token')) {
  //     WriteBtn.style.display = 'block';
  //   }
  //   WriteBtn.style.display = 'none';
  // }, []);

  // https://velog.io/@acwell94/%EC%97%90%EB%9F%AC-never%ED%83%80%EC%9E%85%EC%97%90-%EC%86%8D%EC%84%B1%EC%9D%B4-%EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4

  return (
    <>
      <Container>
        <Container3>
          <h2>Hi, We are Liferary.</h2>
          <StyledP>If you have any questions,</StyledP>
          <StyledP>here is answer.</StyledP>
          <StyledP>Because everything is here.</StyledP>
        </Container3>
        <Continer2>
          <StyledDiv>
            <StyledH2>Choose your category!</StyledH2>
          </StyledDiv>
          <StyledDiv2>
            <StyledP2>food</StyledP2>
            <List title="cook" />
            <List title="baking" />
            <List title="menu" />
            <StyledP2>health</StyledP2>
            <List title="exercise" />
            <List title="hospital" />
            <StyledP2>nonsense</StyledP2>
            <List title="laugh" />
            <List title="happy" />
            <StyledBtn>click here!</StyledBtn>
            <StyledP2>life</StyledP2>
            <div>
              <List title="tips" />
              <List title="house" />
              <Link href="/category">
                <StyledSpan>Full View</StyledSpan>
              </Link>
            </div>
          </StyledDiv2>
        </Continer2>
      </Container>
      <Link href="/s_write">
        <WriteBtn isHide={isHide}>Let's go write!</WriteBtn>
      </Link>
    </>
  );
};

export default Choice;

const WriteBtn = styled.button<{ isHide: boolean }>`
  float: right;
  margin-top: 4.5vh;
  margin-right: 5vw;
  display: ${({ isHide }) => (isHide ? 'none' : 'block')};

  background-color: #2a75f3;
  color: white;
  border: 1px solid #2a75f3;
  border-radius: 10px;
  font-weight: 600;
  font-size: large;

  &:hover {
    background-color: white;
    color: #2a75f3;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 70vh;
  margin-top: 4vh;
  padding-left: 14vw;

  background-color: #72a4f7;
  color: white;
`;

const StyledBtn = styled.button`
  float: right;
  margin-top: 5vh;

  background-color: #a0c3fd;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: 500;

  @media (max-width: 800px) {
    font-size: 0.7em;
  }
`;

const StyledSpan = styled.span`
  float: right;

  color: #4285f4;
  border-bottom: 2px solid #4285f4;
  font-size: large;
  font-weight: 700;

  @media (max-width: 800px) {
    font-size: 1em;
  }
`;

const StyledP2 = styled.p`
  color: #4285f4;
  font-weight: 700;
  font-size: small;
`;

const Container3 = styled.div`
  float: left;
  margin-top: 22vh;
`;

const Continer2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  float: right;

  margin-top: 8vh;
  margin-right: 14vw;

  color: white;
`;

const StyledDiv = styled.div`
  width: 25vw;
  height: 7vh;

  margin-bottom: 1rem;

  background-color: #a0c3fd;
  border-radius: 10px;
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

const StyledDiv2 = styled.div`
  width: 30vw;
  height: 40vh;
  padding: 0.5rem 1rem;

  background-color: white;
  color: #72a4f7;
  border-radius: 5px;
  box-shadow: 5px 5px 20px #444444;
`;

const StyledP = styled.p`
  line-height: 200%;
`;
