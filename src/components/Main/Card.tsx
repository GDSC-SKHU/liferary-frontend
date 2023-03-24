import { useRouter } from "next/router";
import styled from "styled-components";
import Post from "@/types/postType";
import Image from "next/image";
import Study from "@/types/study";

const Card = ({
  data,
  kind,
}: {
  data: Post & Study;
  kind: "main" | "study";
}) => {
  const router = useRouter();

  return (
    <>
      <CardItem
        key={data.id}
        onClick={() =>
          router.push({
            pathname: kind === "main" ? "/share" : "study",
            query: {
              id: kind === "main" ? data.id : data.mainPostId,
            },
          })
        }
      >
        {data.images?.length ? (
          <>
            <CardImage
              src={`https://picsum.photos/200/300`}
              // src={data.images[0]}
              width={"100"}
              height={"70"}
              alt=""
            >
              {/* {data.images[0]} */}
            </CardImage>
          </>
        ) : (
          <CardImage
            src="/NoImage.svg"
            width={"100"}
            height={"70"}
            alt="noimage"
          ></CardImage>
        )}
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

const CardImage = styled(Image)`
  width: 100%;
  height: 70%;
  border-radius: 1rem;
  //cover

  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-4px);
  }
`;
