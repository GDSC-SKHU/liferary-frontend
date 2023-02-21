import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const ShareForm = () => {
  const router = useRouter();
  console.log(router.query.id);
  const { id } = router.query;
  let ready = router.isReady;

  const title = router.query.title;
  const content = router.query.content;
  const name = router.query.name;
  const category = router.query.category;
  const video = router.query.video;

  const [view, setView] = useState();

  useEffect(() => {
    console.log(ready);
    const getView = () => {
      const TOKEN =
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpdUBuYXZlci5jb20iLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjc2OTU2NzgyfQ.S3_1YQdWwSjGOITJQeRRFAL7E0HA2JcSenH_dHO04PU';
      axios
        .get(`http://api-liferary.duckdns.org/api/main/${id}`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            // + (typeof window !== 'undefined'
            //   ? localStorage.getItem('accessToken')
            //   : ''),
          },
          // const id: number = res.data.data.id;
        })
        .then((data) => {
          console.log(TOKEN);
          setView(data.data);
        })
        .catch((e) => {
          alert('Failed to look up');
          console.log(TOKEN);
          console.log(e);
        });
    };
    ready ? getView() : null;
  }, [ready]);

  return (
    <>
      {view !== undefined ? <p>{JSON.stringify(view)}</p> : <p>Loading...</p>}
      <Container>
        <StyledDiv>
          <StyledH2>{title}</StyledH2>
        </StyledDiv>
        <StyledDiv2>
          <StyledSpan>{content}</StyledSpan>
          <StyledSpan>{name}</StyledSpan>
          <StyledSpan>{category}</StyledSpan>
          <StyledSpan>{video}</StyledSpan>
        </StyledDiv2>
      </Container>
    </>
  );
};

export default ShareForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: white;
`;

const StyledDiv = styled.div`
  width: 40vw;
  height: 7vh;

  margin-bottom: 1rem;

  background-color: #72a4f7;
  border-radius: 10px;
  text-align: center;

  @media (max-width: 800px) {
    width: 30vw;
    height: auto;
    padding: 3px;
  }
`;

const StyledDiv2 = styled.div`
  width: 40vw;
  height: 40vh;

  margin-bottom: 1rem;

  background-color: white;
  border-radius: 10px;

  text-align: justify;

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

const StyledSpan = styled.span`
  color: #4285f4;
  font-weight: 500;
  font-size: 1.4rem;

  @media (max-width: 800px) {
    font-size: medium;
  }
`;
