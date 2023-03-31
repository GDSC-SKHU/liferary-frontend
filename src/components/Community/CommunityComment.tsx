import React, { useEffect, useState } from "react";
import axios from "axios";
import { Comment } from "@/types/comment";
import styled from "styled-components";
import { formatDate } from "@/types/date";
import { DateP, TimeContainer } from "../Share/ShareForm";

interface UserInfo {
  email: string;
  nickname: string;
  firebaseAuth: boolean;
}

const CommunityComment = ({ boardPostId }: { boardPostId: number }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    Object.keys(window.localStorage).includes("userInfo") &&
      setUserInfo(
        JSON.parse((localStorage.getItem("userInfo") as string) || "{}")
      );
    console.log(userInfo);
  }, []);

  const [newComment, setNewComment] = useState<string>("");

  const [list, setList] = useState<Comment[]>();

  useEffect(() => {
    axios.get(`/api/comment/${boardPostId}/page/1`).then((res) => {
      setList(res.data);
    });
  }, []);

  const handleSubmitComment = () => {
    const TOKEN = localStorage.getItem("accessToken");

    if (newComment.length === 0) {
      alert("Please share your think!");

      return;
    }

    axios.post(
      `/api/comment/new`,
      {
        boardPostId: boardPostId,
        context: newComment,
      },
      {
        headers: {
          withCredentials: true,
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
  };

  return (
    <>
      {list?.length ? (
        <>
          {list.map((el) => (
            <Container
              style={{ marginBottom: "1rem" }}
              key={(el.id, el.writer, el.context)}
            >
              <CommentItem key={el.id}>
                <Writer>{el.writer}</Writer>
                <span>{el.context} </span>
              </CommentItem>
              <TimeContainer style={{ paddingLeft: "0" }}>
                <DateP style={{ color: "#8e8e8e", marginBottom: "5px" }}>
                  {formatDate(el.modifiedDate)}
                </DateP>
              </TimeContainer>{" "}
            </Container>
          ))}
        </>
      ) : (
        <Notion>No comments</Notion>
      )}
      {userInfo ? (
        <CommentForm onSubmit={handleSubmitComment}>
          <CommentInput
            placeholder="Write comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Btn>Registration</Btn>
        </CommentForm>
      ) : null}
    </>
  );
};

export default CommunityComment;

const Container = styled.div`
  border-bottom: 1px solid #d3d3d3;
`;

const CommentItem = styled.div`
  width: 55vw;

  color: black;
`;

const Writer = styled.span`
  margin-right: 1rem;

  font-weight: 600;
`;

const CommentForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 55vw;
  margin-bottom: 2rem;
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

const Btn = styled.button`
  display: flex;
  align-items: center;

  width: fit-content;
  margin: 0 5px;
  padding: 2px 3px;

  background-color: white;
  border: 1px solid var(--color-main);
  border-radius: 10px;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;
