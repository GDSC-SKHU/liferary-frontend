import styled from 'styled-components';
import Satisfy from './Satisfy';
import ShareForm from './ShareForm';
import Study from './Study';
import Comment from './Comment';

export default function ShareBody() {
  return (
    <>
      <ShareForm />
      <Satisfy />
      <Container>
        <Study />
        <Comment />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 0 25vw;
`;
