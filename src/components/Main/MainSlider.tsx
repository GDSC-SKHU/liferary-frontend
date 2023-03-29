import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Post from "@/types/postType";
import Card from "./Card";
import Study from "@/types/study";

const MainSlider = ({ kind }: { kind: "main" | "study" }) => {
  const [data, setData] = useState<Post[] | Study[]>([]);

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
              <Card kind={kind} data={el} key={idx} />
            ))}
          </SlideShowContainer>
        </>
      ) : (
        <SlideShowContainer>{"There are no posts yet"}</SlideShowContainer>
      )}
    </>
  );
};

export default MainSlider;

const SlideShowContainer = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  height: 35vh;
  overflow: hidden;
  /* border: 0.5px solid gray; */
`;
