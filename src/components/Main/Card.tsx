import { useRouter } from "next/router";
import styled from "styled-components";
import Post from "@/types/postType";

const Card = ({ data }: { data: Partial<Post> }) => {
  const router = useRouter();

  return (
    <>
      <CardItem
        key={data.id}
        onClick={() =>
          router.push({
            pathname: "/share",
            query: {
              id: data.id,
            },
          })
        }
      >
        <Item />
        <Title>{data.title}</Title>
      </CardItem>
    </>
  );
};

export default Card;

const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 20vw;
  height: 100%;
  margin: 10px;
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
  margin: 15px 30px;
  padding: 4px;

  background-color: var(--color-normal);
  color: white;
  border: 1px solid var(--color-normal);
  border-radius: 10px;

  font-size: 100%;
  box-shadow: 2px 2px 4px #777777;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 800px) {
    height: 5vh;

    font-size: x-small;
  }
`;
