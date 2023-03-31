import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "@/types/postType";
import Nav from "@/components/Nav/Nav";
import ListTable from "../../components/Commons/ListTable";
import Pagination from "@/components/Commons/Pagination";
import styled from "styled-components";

export interface SearchProps {
  keyword: string;
}

const Detail = ({ keyword }: SearchProps) => {
  const [list, setList] = useState<Post[]>();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);

  console.log("list", list);
  useEffect(() => {
    axios.get(`/api/main/keyword/${keyword}?page=${page}`).then((data) => {
      setList(data.data.content);
      setTotalPages(data.data.totalPages);
      setTotalElements(totalElements);
    });
  }, [keyword, page]);
  return (
    <>
      <Nav />
      <SearchWrapper>
        <SearchDetail>Search keyword: {keyword}</SearchDetail>
        {list && (
          <ListTable list={list} page={page} totalElements={totalElements} />
        )}
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
      </SearchWrapper>
    </>
  );
};

export default Detail;

export const getServerSideProps: GetServerSideProps<SearchProps> = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const keyword = query.keyword as string;
  console.log(keyword);

  return {
    props: {
      keyword,
    },
  };
};

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchDetail = styled.div`
  margin-top: 1rem;
`;
