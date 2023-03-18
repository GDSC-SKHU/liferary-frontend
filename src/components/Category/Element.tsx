import Link from "next/link";
import styled from "styled-components";

//cooking, fitness, nonsense, relationship, programming, language, makeup, fashion, leisure, travel, etc.

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

const Container = styled.div`
  display: flex;
`;

const LinkWrapper = styled(Link)`
  padding: 2px;
  border: 1px solid var(--color-main);
  border-radius: 10px;
  text-decoration: none;
  color: black;
  :hover {
    background-color: var(--color-main);
    color: white;
  }
`;
const ElementContainer = styled.div`
  transition: all 0.5s ease-in-out;
  &.active {
    opacity: 1;
    height: auto;
    margin: 5px;
    border: 2px solid var(--color-light);
    padding: 30px;
    border-radius: 10px;
  }
  &.inactive {
    opacity: 0;
    height: 0;
    overflow: hidden;
  }
`;
