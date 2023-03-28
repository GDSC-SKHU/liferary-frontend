import Choice, { WriteBtn } from "./Choice";
import styled from "styled-components";
import MainSlider from "./MainSlider";
import Link from "next/link";
import { useEffect, useState } from "react";

interface UserInfo {
  email: string;
  nickname: string;
  firebaseAuth: boolean;
}

export default function MainBody() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    Object.keys(window.localStorage).includes("userInfo") &&
      setUserInfo(
        JSON.parse((localStorage.getItem("userInfo") as string) || "{}")
      );
    console.log(userInfo);
  }, []);

  return (
    <>
      <Choice />
      <div style={{ marginTop: "75vh" }}>
        <BtnContainer>
          {userInfo ? (
            <WriteWrapper>
              <p>Please share your knowledge!</p>
              <Link href="/s_write">
                <WriteBtn>Share now!</WriteBtn>
              </Link>
            </WriteWrapper>
          ) : null}
        </BtnContainer>
      </div>
      <MainPostContainer>
        <h3>Recent Post</h3>
        <MainPostWrapper>
          <MainSlider kind={"main"} />
          {/* <Card page={page} /> */}
        </MainPostWrapper>
        <h3>Recent Study</h3>
        <MainPostWrapper>
          {/* <Card page={page} /> */}
          <MainSlider kind={"study"} />
        </MainPostWrapper>
      </MainPostContainer>
    </>
  );
}

const MainPostContainer = styled.div`
  margin-top: 10vh;

  > h3 {
    margin-left: 8vw;
  }
`;

const MainPostWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin-bottom: 6vh;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const WriteWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 8vh 3vw 0 0;
  gap: 10px;

  > p {
    font-size: 1.2rem;
  }
`;
