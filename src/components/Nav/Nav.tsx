import Link from "next/link";
import styled from "styled-components";
import { auth } from "../Login/GoogleLogin";
import axios from "axios";
import { useLayoutEffect, useState } from "react";

// 새로운 type
interface UserInfo {
  email: string;
  nickname: string;
  firebaseAuth: boolean;
}

export default function Nav() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useLayoutEffect(() => {
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
          <StyledImg src="/Logo2.svg" />
        </Link>
        <NavItemWrapper>
          <Search placeholder="Liferary" />
          <LinkContainer style={{ display: "flex" }}>
            <LinkWrapper href="/category">
              <p>Share Knowledge</p>
            </LinkWrapper>
            <LinkWrapper href="/study">
              <p>Study</p>
            </LinkWrapper>
            <LinkWrapper href="/community">
              <p>Communitiy</p>
            </LinkWrapper>
          </LinkContainer>
        </NavItemWrapper>
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

  height: 15vh;

  position: sticky;
  top: 0;

  background: white;
`;

const StyledSpan = styled.span`
  color: var(--color-normal);

  font-weight: 600;
`;

const StyledImg = styled.img`
  width: 18vw;

  margin-left: 3vw;
`;

const NavItemWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
`;

const LinkContainer = styled.div`
  display: flex;
`;

const LinkWrapper = styled(Link)`
  display: inline-block;

  margin: 0 10px;
  padding: 0 2rem;

  color: var(--clor-main);

  text-decoration: none;

  & > p {
    text-transform: uppercase;
  }
`;

const Search = styled.input`
  background-image: url(/Mag.svg);
  background-repeat: no-repeat;
  background-position: 10px;

  width: 10vw;
  padding: 5px 10px;
  padding-left: 2.5rem;

  background-color: white;
  border: 2px solid var(--color-normal);
  border-radius: 2rem;

  outline: none;
  box-shadow: 2px 2px 5px;
  transition: width 0.2s ease-in-out;

  &:focus {
    width: 50vw;
    transition: width 0.2s ease-in-out;

    ~ ${LinkContainer} {
      padding: 0;
      width: 0px;

      overflow: hidden;
      opacity: 0;
      transition: opacity 0.2s ease-in-out, width 0.3s ease-in-out;
    }
  }
`;

const StyledImg2 = styled.img`
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
