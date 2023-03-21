import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Post from "@/types/postType";
import Card from "./Card";
const MainSlider = ({ kind }: { kind: string }) => {
  const [data, setData] = useState<Post[]>([]);
  useEffect(() => {
    axios.get(`/api/${kind}/all?page=1`, {}).then((data) => {
      setData([...data.data.content]);
      console.log(data.data.content);
    });
  }, []);

  return (
    <>
      {data.length > 0 ? (
        <>
          <SlideShowContainer>
            {data.slice(0, 4).map((el, idx) => (
              <Card data={el} key={idx} />
            ))}
          </SlideShowContainer>
        </>
      ) : (
        <SlideShowContainer>{"There are no posts yet "}</SlideShowContainer>
      )}
    </>
  );
};

export default MainSlider;

const SlideShowContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  height: 30vh;
`;
