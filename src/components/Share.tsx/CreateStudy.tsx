import Link from 'next/link';
import styled from 'styled-components';

export default function CreteStudy() {
  return (
    <>
      <Link href="/st_write">
        <Submit>create study</Submit>
      </Link>
    </>
  );
}

const Submit = styled.button`
  margin-bottom: 1rem;
  padding: 3px 10px;

  background-color: #72a4f7;
  color: white;
  border: 1px solid #72a4f7;
  border-radius: 10px;
  font-weight: 600;
  font-size: large;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: #72a4f7;
    border: 1px solid #72a4f7;
  }
`;
