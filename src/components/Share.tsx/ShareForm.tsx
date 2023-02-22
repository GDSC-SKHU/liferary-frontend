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

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const modifiedDate =
    month + '/' + date + '/' + year + ' ' + hours + ':' + minutes;

  console.log(modifiedDate);

  const [view, setView] = useState();

  useEffect(() => {
    console.log(ready);
    const getView = () => {
      const TOKEN = localStorage.getItem('accessToken');
      axios
        .get(
          `http://api-liferary.duckdns.org/api/main/${id}`,
          {
            params: {
              id: id,
              title: title,
              nickname: name,
              category: category,
              context: content,
              video: video,
              modifiedDate: modifiedDate,
            },
            headers: {
              withCredentials: true,
              Authorization: `Bearer ${TOKEN}`,
            },
          }
          // const id: number = res.data.data.id;
        )
        .then((data) => {
          console.log(TOKEN);
          setView(data.data);
        })
        .catch((e) => {
          // alert('Failed to look up');
          console.log(TOKEN);
          console.log(e);
        });
    };
    ready ? getView() : null;
  }, [id, ready]);

  return (
    <div>
      <Category>
        <p>write time: {modifiedDate}</p>
        <StyledSpan>Category: </StyledSpan>
        <StyledBox>
          <StyledName>{category}</StyledName>
        </StyledBox>
      </Category>
      <div>
        <StyledSpan>Username: </StyledSpan>
        <StyledBox>
          <StyledName>{name}</StyledName>
        </StyledBox>
      </div>
      <Container>
        <StyledDiv>
          <StyledH2>{title}</StyledH2>
        </StyledDiv>
        <StyledDiv2>
          <StyledP>{content}</StyledP>
          <StyledP>{video}</StyledP>
        </StyledDiv2>
      </Container>
    </div>
  );
};

export default ShareForm;

const Category = styled.div`
  margin-top: 2rem;
`;

const StyledSpan = styled.span`
  margin-left: 3vw;

  color: #4285f4;

  font-weight: 600;
  font-size: large;
`;

const StyledBox = styled.div`
  display: inline-block;

  margin: 5px 5px 5px 0.3vw;
  padding: 1px 7px;

  background-color: #2a75f3;
  color: white;
  border-radius: 5px;

  font-weight: 600;
  font-size: large;
  text-align: center;
`;

const StyledName = styled.p`
  @media (max-width: 800px) {
    font-size: 0.7em;
  }
`;

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

const StyledP = styled.p`
  color: #4285f4;

  font-weight: 500;
  font-size: 1.4rem;

  @media (max-width: 800px) {
    font-size: medium;
  }
`;

const StyledH2 = styled.h2`
  @media (max-width: 800px) {
    font-size: medium;
  }
`;
