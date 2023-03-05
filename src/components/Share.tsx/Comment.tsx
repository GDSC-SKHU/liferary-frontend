import Link from "next/link";
import styled from "styled-components";

export default function Comment() {
  return (
    <Container>
      <div>
        <StyledH2>Share your feelings</StyledH2>
        <Link href="/c_list">
          <StyledInput type="text" placeholder="Share your feelings" />
        </Link>
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

  color: var(--color-main);
  border-bottom: 1px solid var(--color-main);
  font-weight: 600;
`;

const StyledInput = styled.input`
  width: 20vw;
  padding: 3px 7px;

  background-color: white;
  border: 1px solid var(--color-main);
  border-radius: 2rem;

  font-size: large;
  outline: none;
  box-shadow: 2px 2px 5px #444444;

  &:focus {
    border: 2px solid var(--color-main);
  }
`;

const StyledBtn = styled.button`
  width: fit-content;
  margin-left: 10px;
  padding: 3px 5px;

  background-color: var(--color-deep);
  color: white;
  border: 1px solid var(--color-deep);
  border-radius: 5px;

  font-weight: 600;
  font-size: large;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: var(--color-deep);
  }
`;
