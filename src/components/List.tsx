import styled from "styled-components";

interface Props {
  title: string;
}

const Category = ({ title }: Props) => {
  return (
    <>
      <Container>
        <StyledP>{title}</StyledP>
      </Container>
    </>
  );
};

export default Category;

const Container = styled.div`
  display: inline-block;

  margin-right: 5px;
  margin-bottom: 5px;
  margin-top: 5px;
  padding: 1px 3px;

  background-color: var(--color-deep);
  color: white;
  border-radius: 5px;

  font-weight: 600;
  font-size: large;
  text-align: center;
`;

const StyledP = styled.p`
  @media (max-width: 800px) {
    font-size: 0.7em;
  }
`;
