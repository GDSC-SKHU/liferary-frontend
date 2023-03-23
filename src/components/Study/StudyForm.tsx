import useUser from "@/hooks/useUser";
import { formatDate } from "@/types/date";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface ViewProps {
  id: string;
  title: string;
  nickname: string;
  context: string;
  images: string[];
  modifiedDate: string;
}

const StudyForm = () => {
  // https://velog.io/@hhhminme/Next.js%EC%97%90%EC%84%9C-SSR%EB%A1%9C-url-query-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0feat.-typescript
  // https://velog.io/@wlgns2223/Next.JS-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EC%BF%BC%EB%A6%AC-undefined-%EC%9D%B4%EC%8A%88

  const router = useRouter();
  const { user } = useUser();
  const id = router.query.id;
  console.log(id);

  let ready = router.isReady;

  const [view, setView] = useState<ViewProps>();

  const onClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const TOKEN = localStorage.getItem("accessToken");
    axios
      .delete(`/api/study?mainPost=${id}`, {
        headers: {
          withCredentials: true,
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then(() => {
        router.push(`/share?id=${id}`);
      })
      .catch((e) => console.log(e));
  };

  const onClickUpdateRouter = () => {
    router.push({
      pathname: "/st_edit",
      query: {
        id: router.query.id,
      },
    });
  };

  useEffect(() => {
    console.log(ready);

    const getView = () => {
      const TOKEN = localStorage.getItem("accessToken");

      axios
        .get(`/api/study?mainPost=${id}`)
        .then((data) => {
          console.log(TOKEN);
          console.log(data.data);
          console.log(data.data.nickname);

          setView(data.data);
        })
        .catch((e) => {
          alert("Failed to look up");
          console.log(TOKEN);
          console.log(e);
        });
    };
    ready ? getView() : null;
  }, [ready]);

  return (
    <div>
      <Category>
        <StyledSpan>Write time: </StyledSpan>
        <span>{formatDate(view?.modifiedDate!)}</span>
        <br />
      </Category>
      <div>
        <StyledSpan>Username: </StyledSpan>
        <StyledBox>
          <StyledName>{view?.nickname}</StyledName>
        </StyledBox>
      </div>
      {view !== undefined ? (
        <Container>
          {user?.nickname === view.nickname ? (
            <div>
              <button onClick={onClickUpdateRouter}>Update</button>
              <button onClick={onClickDelete}>delete</button>
              <StyledDiv>
                <StyledH2>{view.title}</StyledH2>
              </StyledDiv>
            </div>
          ) : (
            <StyledDiv>
              <StyledH2>{view.title}</StyledH2>
            </StyledDiv>
          )}
          <StyledDiv2>
            <StyledP>{view.context}</StyledP>
            <Container2>
              <p>{view.images}</p>
            </Container2>
          </StyledDiv2>
        </Container>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StudyForm;

const Category = styled.div`
  margin-top: 2rem;
`;

const StyledSpan = styled.span`
  margin-left: 3vw;

  color: var(--color-main);

  font-weight: 600;
  font-size: large;
`;

const StyledBox = styled.div`
  display: inline-block;

  margin: 5px 5px 5px 0.3vw;
  padding: 1px 7px;

  background-color: var(--color-deep);
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

const Container2 = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 1rem;

  border-bottom: 3px solid var(--color-normal);
`;

const StyledDiv = styled.div`
  width: 40vw;
  height: 7vh;
  margin-bottom: 1rem;

  background-color: var(--color-normal);
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

const StyledP = styled.p`
  margin-bottom: 1rem;
  padding-bottom: 1rem;

  color: #666666;
  border-bottom: 3px solid var(--color-normal);

  font-weight: 500;
  font-size: 1.4rem;

  @media (max-width: 800px) {
    font-size: medium;
  }
`;
