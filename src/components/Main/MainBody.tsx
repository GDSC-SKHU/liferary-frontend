import Choice from "./Choice";
import styled from "styled-components";
import MainSlider from "./MainSlider";

export default function MainBody() {
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
  display: flex;
  flex-direction: column;

  margin-top: 10vh;

  > h3 {
    margin-left: 8vw;
  }
`;

const MainPostWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin-bottom: 4vh;
`;
