import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
const Search = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>();

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleKeyPress = (e: KeyboardEvent<HTMLElement>) => {
    e.key === "Enter" &&
      inputValue !== undefined &&
      router.push(`/search/${inputValue}`);
  };
  return (
    <SearchContainer
      placeholder="Liferary"
      value={inputValue}
      onChange={handleChangeInput}
      onKeyPress={handleKeyPress}
    />
  );
};

export default Search;

const SearchContainer = styled.input`
  background-image: url(/Mag.svg);
  background-repeat: no-repeat;
  background-position: 10px;

  width: 10vw;
  padding: 5px 10px;
  padding-left: 2.5rem;

  background-color: white;
  border: 2px solid var(--color-normal);
  border-radius: 2rem;

  outline: none;
  box-shadow: 2px 2px 5px;
  transition: width 0.2s ease-in-out;

  &:focus {
    width: 50vw;

    transition: width 0.2s ease-in-out;
    position: fixed;
  }
`;
