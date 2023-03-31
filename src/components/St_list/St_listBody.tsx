import styled from "styled-components";
import { useState, useEffect } from "react";
import Pagination from "../Commons/Pagination";
import axios from "axios";
import StudyListTable from "../Study/StudyListTable";
import { CategoryContainer } from "../C_list/C_listBody";

export default function St_list() {
  const [page, setPage] = useState<number>(1);

  const [totalPage, setTotalPage] = useState<number>(0);

  const [totalElements, setTotalElements] = useState<number>(0);

  const [list, setList] = useState();

  useEffect(() => {
    axios.get(`/api/study/all?page=${page}`).then((data) => {
      console.log(data.data);
      setList(data.data.content);
      setTotalPage(data.data.totalPages);
      setTotalElements(data.data.totalElements);
    });
  }, [page]);

  return (
    <CategoryContainer>
      <StudyListWrapper>
        {totalPage && list ? (
          <StudyListTable
            list={list}
            page={page}
            totalElements={totalElements}
          />
        ) : (
          <div style={{ marginTop: "4vh" }}>There are no posts</div>
        )}
      </StudyListWrapper>
      <Pagination
        totalPages={totalPage}
        currentPage={page}
        onPageChange={setPage}
      ></Pagination>
    </CategoryContainer>
  );
}

export const StudyListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
`;
