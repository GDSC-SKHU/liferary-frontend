import { useState } from "react";
import styled from "styled-components";

interface PaginationData {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationData) => {
  const pageSize = 9;

  const [currentGroup, setCurrentGroup] = useState(1);

  const handlePageChange = (page: number) => {
    onPageChange(page);
    const group = Math.ceil(page / pageSize);
    setCurrentGroup(group);
  };

  const handlePrevClick = () => {
    const prevGroup = currentGroup - 1;
    setCurrentGroup(prevGroup);
    onPageChange((prevGroup - 1) * pageSize + (currentPage % pageSize));
  };

  const handleNextClick = () => {
    const nextGroup = currentGroup + 1;
    setCurrentGroup(nextGroup);
    onPageChange((nextGroup - 1) * pageSize + (currentPage % pageSize));
  };

  const pageButtons = [];
  const startPage = (currentGroup - 1) * pageSize + 1;
  const endPage =
    startPage + pageSize - 1 > totalPages
      ? totalPages
      : startPage + pageSize - 1;

  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <PaginationButton
        key={i}
        isActive={i === currentPage}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </PaginationButton>
    );
  }

  return (
    <PaginationContainer>
      <PaginationButton disabled={currentGroup === 1} onClick={handlePrevClick}>
        {"<<"}
      </PaginationButton>
      {pageButtons}
      <PaginationButton
        disabled={
          !totalPages || currentGroup === Math.ceil(totalPages / pageSize)
        }
        onClick={handleNextClick}
      >
        {">>"}
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20px 0;
`;

const PaginationButton = styled.button<{ isActive?: boolean }>`
  margin: 0 5px;
  padding: 5px 10px;

  background-color: ${({ isActive }) =>
    isActive ? "var(--color-deep)" : "var(--color-light)"};
  color: ${({ isActive }) => (isActive ? "#fff" : "var(--color-main)")};
  border: none;

  cursor: ${({ isActive }) => (isActive ? "default" : "pointer")};

  &:hover {
    background-color: ${({ isActive }) => (isActive ? "#333" : "#ddd")};
  }

  &:disabled {
    background-color: white;
    color: gray;
  }
`;
