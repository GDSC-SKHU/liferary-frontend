import Link from "next/link";
import styled from "styled-components";

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

  background-color: var(--color-normal);
  color: white;
  border: 1px solid var(--color-normal);
  border-radius: 10px;

  font-weight: 600;
  font-size: large;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: var(--color-normal);
    border: 1px solid var(--color-normal);
  }
`;
