import Choice, { WriteBtn } from "./Choice";
import styled from "styled-components";
import MainSlider from "./MainSlider";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface UserInfo {
  email: string;
  nickname: string;
  firebaseAuth: boolean;
}

export default function MainBody() {
  const router = useRouter();
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
        <MainPostWrapper>
          <h3 onClick={() => router.push("/category")}>Recent Post</h3>
          <MainSlider kind={"main"} />
          {/* <Card page={page} /> */}
        </MainPostWrapper>
        <MainPostWrapper>
          <h3 onClick={() => router.push("/st_list")}>Recent Study</h3>
          {/* <Card page={page} /> */}
          <MainSlider kind={"study"} />
        </MainPostWrapper>
      </MainPostContainer>
    </>
  );
}

const MainPostContainer = styled.div`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: default;

  > h3 {
    margin-left: 8vw;
  }
`;

const MainPostWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 6vh;
  width: 80%;

  > h3 {
    :hover {
      color: gray;
    }
  }
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;

  cursor: default;
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
