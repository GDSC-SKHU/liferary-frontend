import Element from "./Element";
import styled, { css } from "styled-components";
import { useState, useEffect } from "react";
import Pagination from "../Commons/Pagination";
import axios from "axios";
import { CategoryParams } from "@/pages/category/[...name]";
import { categoryList } from "../../types/category";
import Link from "next/link";
import ListTable from "../Commons/ListTable";

interface UserInfo {
  email: string;
  nickname: string;
  firebaseAuth: boolean;
}

export default function CategoryBody({ categoryName }: CategoryParams) {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [list, setList] = useState();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    Object.keys(window.localStorage).includes("userInfo") &&
      setUserInfo(
        JSON.parse((localStorage.getItem("userInfo") as string) || "{}")
      );
    console.log(userInfo);
  }, []);

  const handleOpenToggle = () => {
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    const TOKEN = localStorage.getItem("accessToken");
    {
      categoryName
        ? axios
            .get(`/api/main/category/${categoryName}?page=${page}`, {
              headers: {
                withCredentials: true,
                Authorization: `Bearer ${TOKEN}`,
              },
            })
            .then((data) => {
              console.log(data.data);
              setList(data.data.content);
              setTotalPage(data.data.totalPages);
            })
        : //전체 불러오기
          axios
            .get(`/api/main/all?page=${page}`, {
              headers: {
                withCredentials: true,
                Authorization: `Bearer ${TOKEN}`,
              },
            })
            .then((data) => {
              console.log(data.data);
              setList(data.data.content);
              setTotalPage(data.data.totalPages);
            });
    }
  }, [page, categoryName]);
  return (
    <CategoryContainer>
      <ChooseWrapper>
        <ChooseButton onClick={handleOpenToggle}>
          Click and Choose your category!
        </ChooseButton>
        <Element isOpen={isOpen} categories={categoryList} />
      </ChooseWrapper>
      <CategoryListWrapper>
        {totalPage && list ? (
          <ListTable list={list} page={page} />
        ) : (
          <div>{categoryName}게시글이 없습니다.</div>
        )}
      </CategoryListWrapper>
      <Pagination
        totalPages={totalPage}
        currentPage={page}
        onPageChange={setPage}
      ></Pagination>
      {userInfo ? (
        <Link href="/s_write">
          <WriteBtn>Try write!</WriteBtn>
        </Link>
      ) : null}
    </CategoryContainer>
  );
}

const CategoryContainer = styled.div`
  width: 100%;
  margin-top: 4vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ChooseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;
const ChooseButton = styled.div`
  padding: 10px;
  background: var(--color-main);
  color: white;
  border-radius: 20px;
`;
const CategoryListWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Continer2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: white;
`;

const StyledDiv = styled.div`
  width: 25vw;
  height: 7vh;

  margin-bottom: 1rem;

  background-color: var(--color-light);
  border-radius: 10px;
  text-align: center;

  @media (max-width: 800px) {
    width: 30vw;
    height: auto;
    padding: 3px;
  }
`;

const StyledH2 = styled.h2`
  @media (max-width: 800px) {
    font-size: medium;
  }
`;
const WriteBtn = styled.button`
  margin-top: 4.5vh;
  margin-left: 15vw;
  padding: 3px 10px;

  background-color: var(--color-deep);
  color: white;
  border: 1px solid var(--color-deep);
  border-radius: 10px;

  font-weight: 600;
  font-size: large;

  &:hover {
    background-color: white;
    color: var(--color-deep);
  }
`;
