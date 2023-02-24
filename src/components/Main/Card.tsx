import router from 'next/router';
import styled from 'styled-components';

export default function Card() {
  const title = router.query.title;

  return (
    <Container>
      <StyledGrid>
        <Item />
        <Item />
        <Item />
        <Title>{title}</Title> {/* 최신순으로 띄울 수 있게 */}
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
    </Container>
  );
}

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

  background-color: #72a4f7;
  color: white;
  border: 1px solid #72a4f7;
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
