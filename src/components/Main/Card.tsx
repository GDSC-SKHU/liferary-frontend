import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

// interface IView {
//   url: string;
// }

interface IView {
  id: string;
  title: string;
  nickname: string;
  category: string;
  context: string;
  images: string[];
  video: string;
  modifiedDate: string;
}

const Card = () => {
  const router = useRouter();
  let ready = router.isReady;

  const [page, setPage] = useState<number>(1);
  const [view, setView] = useState<IView>();

  console.log(page);

  if (page < 1) {
    setPage(1);
  }

  useEffect(() => {
    console.log(ready);
    const getView = () => {
      const TOKEN = localStorage.getItem("accessToken");

      axios
        .get(`/api/main/all?page=${page}`, {
          headers: {
            withCredentials: true,
            Authorization: `Bearer ${TOKEN}`,
          },
        })
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
    <Container>
      {view !== undefined ? (
        <>
          <StyledGrid>
            <Item />
            <Item />
            <Item />
            <Title>{view.title}</Title>
            <Title>How to join GDSC</Title>
            <Title>How to join GDSCCCCCCCCCCCCCCC</Title>
          </StyledGrid>
          <StyledGrid>
            <Item />
            <Item />
            <Item />
            <Title>How to join GDSC</Title>
            <Title>How to join GDSC</Title>
            <Title>How to join GDSC</Title>
          </StyledGrid>
        </>
      ) : (
        <p>loading</p>
      )}
      <div>
        <button onClick={() => setPage((prev) => prev - 1)}>Prev</button>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </Container>
  );
};

export default Card;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 10vh 0;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 25vw 25vw 25vw;
  grid-template-rows: 15vw 60px;
`;

const Item = styled.div`
  margin: 0 30px;
  margin-top: 30px;

  background-color: #eeeeee;
  border-radius: 1rem;

  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Title = styled.button`
  margin: 10px 30px;

  background-color: var(--color-normal);
  color: white;
  border: 1px solid var(--color-normal);
  border-radius: 10px;

  font-size: 120%;
  box-shadow: 0 4px 4px -2px #444444;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 800px) {
    height: 5vh;

    font-size: x-small;
  }
`;
