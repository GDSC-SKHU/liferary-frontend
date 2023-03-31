import axios from "axios";
import React, { useEffect, useState, useLayoutEffect } from "react";
import ListTable from "../Commons/ListTable";
import Pagination from "../Commons/Pagination";
import styled from "styled-components";
import StudyListTable from "../Study/StudyListTable";
import CommunityListTable from "../Community/CommunityListTable";

type kind = "Knowledge" | "Study" | "Community";

export const User_post = ({ kind }: { kind: kind }) => {
  const [list, setList] = useState();

  const [page, setPage] = useState<number>(1);

  const [totalPage, setTotalPage] = useState<number>();

  const [totalElements, setTotalElements] = useState<number>(0);

  const [url, setUrl] = useState("");

  useLayoutEffect(() => {
    switch (kind) {
      case "Knowledge":
        setUrl(`/api/main/post/member?page=`);
        break;
      case "Study":
        setUrl(`/api/study/member?page=`);
        break;
      case "Community":
        setUrl(`/api/board/member/page?page=`);
        break;
      default:
        setUrl("");
        break;
    }
  }, [kind]);

  useEffect(() => {
    const TOKEN = localStorage.getItem("accessToken");
    {
      url &&
        axios
          .get(`${url} ${page}`, {
            headers: {
              withCredentials: true,
              Authorization: `Bearer ${TOKEN}`,
            },
          })
          .then((data) => {
            setList(data.data.content);
            setTotalPage(data.data.totalPages);
            setTotalElements(data.data.totalElements);
          });
    }
  }, [page, url]);

  return (
    <>
      {totalPage && list ? (
        <UserPostContainer>
          {kind === "Knowledge" && (
            <ListTable list={list} page={page} totalElements={totalElements} />
          )}
          {kind === "Study" && (
            <StudyListTable
              list={list}
              page={page}
              totalElements={totalElements}
            />
          )}
          {kind === "Community" && (
            <CommunityListTable
              list={list}
              page={page}
              totalElements={totalElements}
            />
          )}

          <Pagination
            totalPages={totalPage}
            currentPage={page}
            onPageChange={setPage}
          ></Pagination>
        </UserPostContainer>
      ) : (
        <UserPostContainer>
          <>There&apos;s no comment.</>
        </UserPostContainer>
      )}
    </>
  );
};

const UserPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  width: 100%;
`;
