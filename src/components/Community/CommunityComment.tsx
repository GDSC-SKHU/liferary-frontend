import React, { useEffect, useState } from "react";
import axios from "axios";
import useToken from "@/hooks/useToken";
import { Comment } from "@/types/comment";
import styled from "styled-components";
import { formatDate } from "@/types/date";
import { Btn, DateP, TimeContainer } from "../Share/ShareForm";

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
    if (newComment.length === 0) {
      alert("Please share your think!");

      return;
    }

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
            <div>
              <CommentItem key={el.id}>
                <Writer>{el.writer}</Writer>
                <Content>{el.context} </Content>
              </CommentItem>
              <TimeContainer style={{ paddingLeft: "0" }}>
                <DateP style={{ color: "black" }}>
                  {formatDate(el.modifiedDate)}
                </DateP>
              </TimeContainer>{" "}
            </div>
          ))}
        </>
      ) : (
        <Notion>no comments</Notion>
      )}
      <CommentForm onSubmit={handleSubmitComment}>
        <CommentInput
          placeholder="Write comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Btn type="submit" style={{ margin: "0", marginTop: "1rem" }}>
          Registration
        </Btn>
      </CommentForm>
    </>
  );
};

export default CommunityComment;

const CommentItem = styled.div`
  width: 55vw;

  color: black;
`;

const Writer = styled.span`
  margin-right: 1rem;
  font-weight: 600;
`;

const Content = styled.span``;

const CommentForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 55vw;
`;

const CommentInput = styled.textarea`
  width: 50vw;
  height: 5vh;

  border: none;
  border-bottom: 1px solid black;

  outline: none;
`;

const Notion = styled.p`
  color: black;
`;
