import { ChangeEvent, useState } from "react";
import styled from "styled-components";

interface Category {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  currentCategory?: string;
}

const DropDownCategory = ({ onChange, currentCategory }: Category) => {
  const categoryList = [
    "cooking",
    "fitness",
    "nonsense",
    "relationship",
    "programming",
    "language",
    "makeup",
    "fashion",
    "leisure",
    "travel",
    "music",
    "etc",
  ];

  return (
    <>
      <StyledSelect
        id="category"
        onChange={onChange}
        defaultValue={currentCategory?.toLocaleLowerCase()}
      >
        <option value="">select category</option>
        {categoryList.map((el) => (
          <option value={el} key={el}>
            {el.toUpperCase()}
          </option>
        ))}
      </StyledSelect>
    </>
  );
};

export default DropDownCategory;

const StyledSelect = styled.select`
  padding: 5px 7px;
  margin-top: 5px;

  border: none;
  border-radius: 4px;

  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(80, 165, 255, 0.5);
  }

  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`;
