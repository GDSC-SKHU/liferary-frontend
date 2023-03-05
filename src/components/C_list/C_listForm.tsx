import Link from "next/link";
import styled from "styled-components";

export default function C_listForm() {
  return (
    <>
      <Container>
        <TitleContainer>
          <span>Index</span>
          <span>Title</span>
          <span>Name</span>
          <span>Date</span>
        </TitleContainer>
        <br />
        <ContentContainer>
          <StyledSpan>1</StyledSpan>
          <StyledSpan>It's hard to a</StyledSpan>
          <StyledSpan>babo</StyledSpan>
          <StyledSpan>08/14/22</StyledSpan>
        </ContentContainer>
        <ContentContainer>
          <StyledSpan>1</StyledSpan>
          <StyledSpan>It's hard to a</StyledSpan>
          <StyledSpan>babo</StyledSpan>
          <StyledSpan>08/14/22</StyledSpan>
        </ContentContainer>
        <ContentContainer>
          <StyledSpan>1</StyledSpan>
          <StyledSpan>It's hard to a</StyledSpan>
          <StyledSpan>babo</StyledSpan>
          <StyledSpan>08/14/22</StyledSpan>
        </ContentContainer>
        <ContentContainer>
          <StyledSpan>1</StyledSpan>
          <StyledSpan>It's hard to a</StyledSpan>
          <StyledSpan>babo</StyledSpan>
          <StyledSpan>08/14/22</StyledSpan>
        </ContentContainer>
        <ContentContainer>
          <StyledSpan>1</StyledSpan>
          <StyledSpan>It's hard to a</StyledSpan>
          <StyledSpan>babo</StyledSpan>
          <StyledSpan>08/14/22</StyledSpan>
        </ContentContainer>
      </Container>
      <Link href="/s_write">
        <WriteBtn>Try write!</WriteBtn>
      </Link>
    </>
  );
}

const Container = styled.div`
  margin-top: 7vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 70vw;
  height: 6vh;
  margin-top: 3vh;
  padding: 0 20px;

  background-color: var(--color-normal);
  color: white;
  border-radius: 10px;
  opacity: 0.5;

  font-size: 20px;
`;

const StyledSpan = styled.span`
  padding: 3px 15px;

  background-color: var(--color-normal);
  border-radius: 1rem;
  opacity: 0.5;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 70vw;
  height: 6vh;
  margin: 0 10em;
  padding: 1.5em 20px;

  color: white;
  /* border-top: 1px solid var(--color-normal); */
  border-bottom: 1px solid var(--color-normal);

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-size: 20px;
`;

const WriteBtn = styled.button`
  margin-top: 4.5vh;
  margin-left: 15vw;
  padding: 3px 10px;

  background-color: var(--color-deep);
  color: white;
  border: 1px solid var(--color-deep);
  border-radius: 10px;

  font-weight: 600;
  font-size: large;

  &:hover {
    background-color: white;
    color: var(--color-deep);
  }
`;
