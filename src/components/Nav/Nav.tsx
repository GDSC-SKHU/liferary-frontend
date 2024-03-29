import Link from "next/link";
import styled from "styled-components";
import { useLayoutEffect, useState } from "react";
import Search from "../Commons/Search";
import { handleLogout } from "@/utils/logout";
import { useRouter } from "next/router";

// 새로운 type
interface UserInfo {
  email: string;
  nickname: string;
  firebaseAuth: boolean;
}

export default function Nav() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useLayoutEffect(() => {
    Object.keys(window.localStorage).includes("userInfo") &&
      setUserInfo(
        JSON.parse((localStorage.getItem("userInfo") as string) || "{}")
      );
    // console.log(userInfo);
  }, []);

  return (
    <>
      <Container>
        <Link href={"/"}>
          <StyledImg src="/Logo2.svg" />
        </Link>
        <NavItemWrapper>
          <Search />
          <LinkContainer style={{ display: "flex" }}>
            <LinkWrapper
              href="/category"
              active={router.pathname === "/category"}
            >
              <p>Share Knowledge</p>
            </LinkWrapper>
            <LinkWrapper
              href="/st_list"
              active={router.pathname === "/st_list"}
            >
              <p>Study</p>
            </LinkWrapper>
            <LinkWrapper href="/c_list" active={router.pathname === "/c_list"}>
              <p>Community</p>
            </LinkWrapper>
          </LinkContainer>
        </NavItemWrapper>
        {userInfo ? (
          <>
            <Link href="/user_info" style={{ textDecoration: "none" }}>
              <StyledSpan>
                {userInfo && "Welcome, " + userInfo?.nickname + "!"}
              </StyledSpan>
            </Link>
            <UserContainer>
              {/* <Link href="/user_info">
            <StyledImg2 src="/Pro.svg" alt="" />
          </Link> */}
              <Link style={{ textDecoration: "none" }} href="/login">
                <LoginBtn onClick={handleLogout}>Logout</LoginBtn>
              </Link>
            </UserContainer>
          </>
        ) : (
          <UserContainer>
            <Link style={{ textDecoration: "none" }} href="/login">
              <LoginBtn>Login</LoginBtn>
            </Link>
          </UserContainer>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 10vh;
  position: sticky;
  top: 0;

  background: white;
  box-shadow: 0px 0px 1px 2px #f0f0f0;

  z-index: 1000;
`;

const StyledSpan = styled.span`
  padding: 2px 4px;

  color: var(--color-normal);
  border: 1px solid white;

  font-weight: 400;

  :hover {
    padding: 2px 4px;

    border: 1px solid var(--color-normal);
    border-radius: 5px;
  }
`;

const StyledImg = styled.img`
  width: 13vw;
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

const LinkWrapper = styled(Link)<{ active: boolean }>`
  display: inline-block;

  margin: 0 10px;
  padding: 0 2rem;

  color: var(--clor-main);
  text-decoration: none;

  & > p {
    text-transform: uppercase;
    color: ${({ active }) => active && "var(--color-main)"};
    font-weight: 400;
    transition: transform 0.3s;

    :hover {
      transform: translateY(-2px);

      color: var(--color-deep);
    }
  }
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBtn = styled.button`
  margin-right: 2.86vw;

  background-color: var(--color-deep);
  color: white;
  border: 1px solid var(--color-deep);
  border-radius: 5px;

  &:hover {
    background-color: white;
    color: var(--color-deep);
  }
`;
