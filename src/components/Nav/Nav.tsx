import Link from "next/link";
import styled from "styled-components";
import { auth } from "../Login/GoogleLogin";
import axios from "axios";
import { useEffect, useState } from "react";

// 새로운 type
interface UserInfo {
  email: string;
  nickname: string;
  firebaseAuth: boolean;
}

export default function Nav() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    Object.keys(window.localStorage).includes("userInfo") &&
      setUserInfo(
        JSON.parse((localStorage.getItem("userInfo") as string) || "{}")
      );
    console.log(userInfo);
  }, []);

  const handleLogout = () => {
    console.log(localStorage.getItem("userInfo"));
    if (
      JSON.parse(localStorage.getItem("userInfo") || "").firebaseAuth === true
    ) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");
      auth.signOut();
    } else {
      axios
        .post(
          "/api/member/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              RefreshToken: localStorage.getItem("refreshToken"),
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userInfo");
          }
        });
    }
    alert("Success Logout!");
  };

  return (
    <>
      <Container>
        <Link href={"/"}>
          <StyledImg src="/Logo.svg" />
        </Link>
        <Search placeholder="Liferary" />
        <StyledSpan>
          {userInfo && "Welcome, " + userInfo?.nickname + "!"}
        </StyledSpan>
        <UserContainer>
          <Link href="/user_info">
            <StyledImg2 src="/Pro.svg" alt="" />
          </Link>
          <Link style={{ textDecoration: "none" }} href="/login">
            {userInfo ? (
              <LoginBtn onClick={handleLogout}>Logout</LoginBtn>
            ) : (
              <LoginBtn>Login</LoginBtn>
            )}
          </Link>
        </UserContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledSpan = styled.span`
  margin-top: 3vh;

  color: var(--color-normal);
  font-weight: 600;
`;

const StyledImg = styled.img`
  width: 18vw;
  height: auto;

  margin-top: 1vh;
  margin-left: 3vw;
  padding-top: 1rem;
`;

const Search = styled.input`
  background-image: url(/Mag.svg);
  background-repeat: no-repeat;
  background-position: 10px;

  width: 50vw;
  height: 7vh;
  margin-top: 3vh;
  padding: 5px 10px;
  padding-left: 2.5rem;

  outline: none;
  background-color: white;
  border: 2px solid var(--color-normal);
  border-radius: 2rem;
  box-shadow: 2px 2px 5px;
`;

const StyledImg2 = styled.img`
  margin-top: 3vh;
  margin-right: 3vw;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginBtn = styled.button`
  margin-right: 2.86vw;

  background-color: var(--color-deep);
  color: white;
  border: 1px solid var(--color-deep);
  border-radius: 10px;

  &:hover {
    background-color: white;
    color: var(--color-deep);
  }
`;
