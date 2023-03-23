import styled from "styled-components";
import { useState, useEffect } from "react";
import Pagination from "../Commons/Pagination";
import axios from "axios";
import { mainPostIdParams } from "@/pages/c_list/[...id]";
import CommunityListTable from "../Community/CommunityListTable";
import router from "next/router";

export default function C_list({ mainPostId }: mainPostIdParams) {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [list, setList] = useState();

  const onClickRouter = () => {
    router.push({
      pathname: `/c_write`,
      query: {
        id: router.query.id,
      },
    });
  };

  useEffect(() => {
    const TOKEN = localStorage.getItem("accessToken");
    {
      mainPostId
        ? axios
            .get(`/api/board/${mainPostId}/page?page=${page}`, {
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
            .get(`/api/board/all?page=${page}`, {
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
      <CategoryListWrapper>
        {totalPage && list ? (
          <CommunityListTable list={list} page={page} />
        ) : (
          <div>{mainPostId}There are no posts.</div>
        )}
      </CategoryListWrapper>
      <Pagination
        totalPages={totalPage}
        currentPage={page}
        onPageChange={setPage}
      ></Pagination>
      <WriteBtn onClick={onClickRouter}>Try write!</WriteBtn>
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
