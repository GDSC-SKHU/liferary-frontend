import axios from "axios";
import React, { useEffect, useState, useLayoutEffect } from "react";
import ListTable from "../Commons/ListTable";
import Pagination from "../Commons/Pagination";
import styled from "styled-components";

type kind = "Knowledge" | "Study" | "Community";

export const User_post = ({ kind }: { kind: kind }) => {
  const [list, setList] = useState();

  const [page, setPage] = useState<number>(1);

  const [totalPage, setTotalPage] = useState<number>();

  const [url, setUrl] = useState("");

  useLayoutEffect(() => {
    switch (kind) {
      case "Knowledge":
        setUrl(`/api/main/post/member?page=`);
        break;
      case "Study":
        setUrl(`/api/main/post/member?page=`);
        break;
      case "Community":
        setUrl(`/api/main/post/member?page=`);
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
          });
    }
  }, [page, url]);

  return (
    <>
      {totalPage && list ? (
        <UserPostContainer>
          <ListTable list={list} page={page} />
          <Pagination
            totalPages={totalPage}
            currentPage={page}
            onPageChange={setPage}
          ></Pagination>
        </UserPostContainer>
      ) : (
        <UserPostContainer>
          <>글이 없습니다.</>
        </UserPostContainer>
      )}
    </>
  );
};

const UserPostContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;
