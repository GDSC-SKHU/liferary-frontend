import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

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
  const [views, setViews] = useState<IView[] | any>();

  console.log(page);

  if (page < 1) {
    setPage(1);
  }

  const onClickAddPage = () => {
    setPage((prev) => prev + 1);
    return;
  };

  const onClickPrevPage = () => {
    setPage((prev) => prev - 1);
    return;
  };

  useEffect(() => {
    console.log(ready);
    const getViews = () => {
      const TOKEN = localStorage.getItem("accessToken");

      // header 인스턴스 값 지정, async-await
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

          setViews(data.data.content);
        })
        .catch((e) => {
          alert("Failed to look up");
          console.log(TOKEN);
          console.log(e);
        });
    };
    ready ? getViews() : null;
  }, [ready, page]);

  views?.map(function (el: IView) {
    return el;
  });

  console.log(views);

  return (
    <Container>
      {views !== undefined ? (
        <>
          <StyledGrid>
            {views.map((el: IView) => {
              return (
                <CardItem
                  key={el.id}
                  onClick={() =>
                    router.push({
                      pathname: "/share",
                      query: {
                        id: el.id,
                      },
                    })
                  }
                >
                  <Item></Item>
                  <Title>{el.title}</Title>
                </CardItem>
              );
            })}
          </StyledGrid>
        </>
      ) : (
        <p>loading</p>
      )}
      <div>
        <button onClick={onClickPrevPage}>Prev</button>
        <span>{page}</span>
        <button onClick={onClickAddPage}>Next</button>
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

  margin-top: 15vh;
  margin-bottom: 5vh;
`;

const StyledGrid = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 23vw 23vw 23vw;
`;

const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 30vh;
`;
const Item = styled.div`
  width: 100%;
  height: 70%;
  background-color: #eeeeee;
  border-radius: 1rem;

  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Title = styled.button`
  width: 100%;

  margin: 10px 30px;
  padding: 5px;
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
