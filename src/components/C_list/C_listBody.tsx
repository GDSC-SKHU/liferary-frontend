import Element from "@/components/Category/Element";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Pagination from "../Commons/Pagination";
import axios from "axios";
import { mainPostIdParams } from "@/pages/category/[...name]";
import { categoryList } from "../../types/category";
import Link from "next/link";
import ListTable from "../Commons/ListTable";

export default function C_list({ mainPostId }: mainPostIdParams) {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [list, setList] = useState();

  const handleOpenToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const TOKEN = localStorage.getItem("accessToken");
    {
      mainPostId
        ? axios
            .get(`/api/board/${mainPostId}/post?page=${page}`, {
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
  }, [page, mainPostId]);
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
          <div>{mainPostId}게시글이 없습니다.</div>
        )}
      </CategoryListWrapper>
      <Pagination
        totalPages={totalPage}
        currentPage={page}
        onPageChange={setPage}
      ></Pagination>
      <Link href="/s_write">
        <WriteBtn>Try write!</WriteBtn>
      </Link>
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
