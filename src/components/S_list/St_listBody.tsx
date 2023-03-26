import styled from "styled-components";
import { useState, useEffect } from "react";
import Pagination from "../Commons/Pagination";
import axios from "axios";
import StudyListTable from "../Study/StudyListTable";

export default function St_list() {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [list, setList] = useState();

  useEffect(() => {
    const TOKEN = localStorage.getItem("accessToken");

    axios
      .get(`/api/study/all?page=${page}`, {
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
  }, [page]);

  return (
    <StudyListContainer>
      <StudyListWrapper>
        {totalPage && list ? (
          <StudyListTable list={list} page={page} />
        ) : (
          <div>There are no posts.</div>
        )}
      </StudyListWrapper>
      <Pagination
        totalPages={totalPage}
        currentPage={page}
        onPageChange={setPage}
      ></Pagination>
    </StudyListContainer>
  );
}

const StudyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-top: 4vh;
`;

const StudyListWrapper = styled.div`
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
