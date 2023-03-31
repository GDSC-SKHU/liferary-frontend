import styled from "styled-components";
import ShareForm, { Btn, Icon } from "./ShareForm";
import { ShareProps } from "@/pages/share";
import Recruit from "./Recruit";
import Community from "./Community";
import router from "next/router";
import { useEffect, useState } from "react";

interface UserInfo {
  email: string;
  nickname: string;
  firebaseAuth: boolean;
}

export default function ShareBody({ id }: ShareProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    Object.keys(window.localStorage).includes("userInfo") &&
      setUserInfo(
        JSON.parse((localStorage.getItem("userInfo") as string) || "{}")
      );
    console.log(userInfo);
  }, []);

  const onClickViewMoreBoard = () => {
    router.push({
      pathname: `/c_list/${id}`,
    });
  };

  return (
    <>
      <ShareForm id={id} />
      {userInfo ? (
        <div style={{ display: "flex", marginLeft: "22vw" }}>
          <Btn
            style={{ width: "fit-content" }}
            onClick={() => router.push(`/c_write?id=${id}`)}
            title="Ask any questions"
          >
            <Icon src="/Study.svg" />
            <p>Community</p>
          </Btn>
          <Btn onClick={onClickViewMoreBoard} title="View more">
            <Icon src="/List.svg" />
            <p>List</p>
          </Btn>
        </div>
      ) : (
        <Btn
          style={{ marginLeft: "22vw" }}
          onClick={onClickViewMoreBoard}
          title="View more"
        >
          <Icon src="/List.svg" />
        </Btn>
      )}
      <Container>
        <Wrapper>
          <Recruit id={id} />
          <Community id={id} />
        </Wrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 55vw;
  margin-top: 1rem;

  cursor: default;
`;
