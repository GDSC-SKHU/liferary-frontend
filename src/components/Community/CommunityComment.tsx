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
              {el.context}
              {el.writer}
              {formatDate(el.modifiedDate)}
            </CommentItem>
          ))}
        </>
      ) : (
        <div>no comments</div>
      )}
      <form onSubmit={handleSubmitComment}>
        <input
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
  display: flex;
  color: black;
`;
