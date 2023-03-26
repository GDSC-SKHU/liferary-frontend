import styled from "styled-components";
import { useState, useEffect } from "react";
import Pagination from "../Commons/Pagination";
import axios from "axios";
import { mainPostIdParams } from "@/pages/c_list/[...id]";
import CommunityListTable from "../Community/CommunityListTable";

export default function C_list({ mainPostId }: mainPostIdParams) {
  const [page, setPage] = useState<number>(1);

  const [totalPage, setTotalPage] = useState<number>(0);

  const [list, setList] = useState();

  useEffect(() => {
    mainPostId
      ? axios.get(`/api/board/${mainPostId}/page?page=${page}`).then((data) => {
          console.log(data.data);
          setList(data.data.content);
          setTotalPage(data.data.totalPages);
        })
      : //전체 불러오기
        axios.get(`/api/board/all?page=${page}`).then((data) => {
          console.log(data.data);
          setList(data.data.content);
          setTotalPage(data.data.totalPages);
        });
  }, [page, mainPostId]);

  return (
    <CategoryContainer>
      <CategoryListWrapper>
        {totalPage && list ? (
          <CommunityListTable list={list} page={page} />
        ) : (
          <div>There are no posts.</div>
        )}
      </CategoryListWrapper>
      <Pagination
        totalPages={totalPage}
        currentPage={page}
        onPageChange={setPage}
      ></Pagination>
    </CategoryContainer>
  );
}

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 4vh;
`;

const CategoryListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
`;
