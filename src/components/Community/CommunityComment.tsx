import React, { useEffect, useState } from "react";
import axios from "axios";
import useToken from "@/hooks/useToken";
import { Comment } from "@/types/comment";
import styled from "styled-components";
import { formatDate } from "@/types/date";

const CommunityComment = ({ boardPostId }: { boardPostId: number }) => {
  const { allToken } = useToken();

  const [newComment, setNewComment] = useState<string>("");

  const [list, setList] = useState<Comment[]>();

  useEffect(() => {
    axios.get(`/api/comment/${boardPostId}/page/1`).then((res) => {
      setList(res.data);
      // console.log(list);
    });
  }, []);
  const handleSubmitComment = () => {
    axios.post(
      `/api/comment/new`,
      {
        boardPostId,
        context: newComment,
      },
      {
        headers: {
          withCredentials: true,
          Authorization: allToken,
        },
      }
    );
  };
  return (
    <>
      {list?.length ? (
        <>
          {list.map((el) => (
            <CommentItem key={el.id}>
              {el.writer}: {el.context} {formatDate(el.modifiedDate)}
            </CommentItem>
          ))}
        </>
      ) : (
        <Notion>no comments</Notion>
      )}
      <form onSubmit={handleSubmitComment}>
        <CommentInput
          placeholder="write comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
      </form>
    </>
  );
};

export default CommunityComment;

const CommentItem = styled.div`
  color: black;
`;

const CommentInput = styled.textarea`
  width: 20vw;
  height: 10rem;

  border: 1px solid black;
  border-radius: 10px;

  outline: none;
`;

const Notion = styled.p`
  color: black;
`;
