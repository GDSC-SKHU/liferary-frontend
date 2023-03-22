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
              {category}
            </LinkWrapper>
          ))}
        </Container>
      </ElementContainer>
    </>
  );
}

const ElementContainer = styled.div`
  transition: all 0.5s ease-in-out;

  &.active {
    height: auto;
    margin: 5px;
    padding: 30px;

    border: 2px solid var(--color-light);
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
`;

const LinkWrapper = styled(Link)`
  padding: 2px;

  color: black;
  border: 1px solid var(--color-main);
  border-radius: 10px;

  text-decoration: none;

  :hover {
    background-color: var(--color-main);
    color: white;
  }
`;
