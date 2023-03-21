import { PageProps } from "@/pages";
import Card from "./Card";
import Choice from "./Choice";
import styled from "styled-components";
import MainSlider from "./MainSlider";
export default function MainBody({ page }: PageProps) {
  return (
    <>
      <Choice />
      <MainPostContainer>
        <h3>Recent Post</h3>
        <MainPostWrapper>
          <MainSlider kind={"main"} />
          {/* <Card page={page} /> */}
        </MainPostWrapper>
        <h3>Recent Study</h3>
        <MainPostWrapper>
          {/* <Card page={page} /> */}
          <MainSlider kind={"study"} />
        </MainPostWrapper>
      </MainPostContainer>
    </>
  );
}

const MainPostContainer = styled.div`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  > h3 {
    margin-left: 8vw;
  }
`;

const MainPostWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3vh;
`;
