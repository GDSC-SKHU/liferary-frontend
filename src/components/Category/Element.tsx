import Link from "next/link";
import styled from "styled-components";

interface ElementProps {
  isOpen: boolean;
  categories: string[];
}

export default function Element({ isOpen, categories }: ElementProps) {
  return (
    <>
      <ElementContainer className={isOpen ? "active" : "inactive"}>
        <Container>
          {categories.map((category) => (
            <LinkWrapper href={`/category/${category}`} key={category}>
              {category.toUpperCase()}
            </LinkWrapper>
          ))}
        </Container>
      </ElementContainer>
    </>
  );
}

const ElementContainer = styled.div`
  transition: all 0.1s ease-in-out;

  &.active {
    height: auto;
    margin: 5px;
    padding: 30px;

    border: 1px solid var(--color-light);
    border-radius: 10px;
    opacity: 1;
  }

  &.inactive {
    height: 0;

    opacity: 0;
    overflow: hidden;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 1rem;
  width: 65vw;
`;

const LinkWrapper = styled(Link)`
  margin: 0 3px;
  padding: 2px 5px;

  color: black;
  border: 1px solid var(--color-main);
  border-radius: 10px;

  font-size: 13px;
  text-decoration: none;

  :hover {
    background-color: var(--color-main);
    color: white;
  }
`;
