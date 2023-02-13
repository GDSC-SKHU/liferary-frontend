import styled from 'styled-components';

export default function Comment() {
  return (
    <Container>
      <div>
        <StyledH2>Share your feelings</StyledH2>
        <StyledInput type="text" placeholder="Share your feelings" />
        <StyledBtn>Enter</StyledBtn>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-bottom: 10vh;
`;

const StyledH2 = styled.h2`
  width: fit-content;
  margin-bottom: 1rem;
  padding: 10px;

  color: #4285f4;
  border-bottom: 1px solid #4285f4;
  font-weight: 600;
`;

const StyledInput = styled.input`
  width: 20vw;
  padding: 3px 7px;

  background-color: white;
  border: 1px solid #4285f4;
  border-radius: 2rem;

  font-size: large;
  outline: none;
  box-shadow: 2px 2px 5px #444444;

  &:focus {
    border: 2px solid #4285f4;
  }
`;

const StyledBtn = styled.button`
  width: fit-content;
  margin-left: 10px;
  padding: 3px 5px;

  background-color: #2a75f3;
  color: white;
  border: 1px solid #2a75f3;
  border-radius: 5px;

  font-weight: 600;
  font-size: large;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: #2a75f3;
  }
`;
