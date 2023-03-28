import { categoryList } from "@/types/category";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { keyframes } from "styled-components";

interface UserInfo {
  email: string;
  nickname: string;
  firebaseAuth: boolean;
}

const Choice = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    Object.keys(window.localStorage).includes("userInfo") &&
      setUserInfo(
        JSON.parse((localStorage.getItem("userInfo") as string) || "{}")
      );
    console.log(userInfo);
  }, []);

  // const [isHide, setIsHide] = useState<boolean>(false);

  // useEffect(() => {
  //   if (localStorage.getItem("accessToken")) setIsHide(false);
  //   else setIsHide(true);
  // }, []);

  // useEffect(() => {
  //   if (sessionStorage.getItem('Token')) {
  //     WriteBtn.style.display = 'block';
  //   }
  //   WriteBtn.style.display = 'none';
  // }, []);

  // https://velog.io/@acwell94/%EC%97%90%EB%9F%AC-never%ED%83%80%EC%9E%85%EC%97%90-%EC%86%8D%EC%84%B1%EC%9D%B4-%EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4

  return (
    <>
      <BannerContainer>
        <BannerWrapper2>
          <h2>Hi, We are Liferary!</h2>
          <div style={{ fontSize: "18px" }}>
            <p>If you have any questions, here is answer.</p>
            <p>Because everything is here.</p>
          </div>
        </BannerWrapper2>
        <BannerWrapper>
          <h4 style={{ marginRight: "8vw" }}>
            What kind of knowledge do you want to know?
          </h4>
          <BannerCategoryWrapper style={{ marginRight: "8vw" }}>
            {categoryList.map((el) => {
              return (
                <p
                  key={el}
                  onClick={() => {
                    router.push(`/category/${el}`);
                  }}
                >
                  {el.toUpperCase()}
                </p>
              );
            })}
          </BannerCategoryWrapper>
        </BannerWrapper>
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
      </BannerContainer>
      {/* <Link href="/s_write">
        <WriteBtn isHide={isHide}>Let's go write!</WriteBtn>
      </Link> */}
    </>
  );
};

export default Choice;

const boxFade = keyframes`
0% {
    opacity: 1;
    top: 20px;
 
  }
  50% {
    opacity: 1;
    top: 25px;
  }
  100% {
    opacity: 1;
    top: 20px;
  }`;

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  float: right;

  padding: 1.5rem;
`;

const BannerWrapper2 = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 40%;
  height: 70vh;
  margin-top: 11vh;
  left: 8vw;

  border-radius: 50px;
  position: absolute;
  animation: ${boxFade} 2s 1s infinite linear alternate;

  background-color: var(--color-main);
  color: white;

  transition: all 0.5s ease-in-out;
  z-index: -1;

  > h2 {
    padding: 0;
    margin: 0;
    margin-bottom: 1rem;

    font-size: 2rem;
  }

  > div > p {
    padding: 3px 0;
    margin-top: 1rem;
  }
`;

const BannerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 65vh;
  margin-top: 2vh;
  margin-left: 55vw;

  > h2 {
    padding: 0;
    margin: 0;
    margin-bottom: 1rem;

    font-size: large;
  }

  > div > p {
    padding: 3px 2px;
    margin-top: 1rem;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BannerCategoryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  margin: 20px;

  cursor: default;

  > p {
    display: flex;
    justify-content: center;

    padding: 5px;
    margin: 0 5px;

    color: gray;
    border: 1px solid var(--color-light);
    border-radius: 10px;

    transition: 0.2s;

    box-shadow: 0px 2px 2px gray;

    :hover {
      transform: translateY(-2px);

      background-color: white;
      color: var(--color-deep);
    }
  }
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

export const WriteBtn = styled.button`
  float: right;

  background-color: var(--color-deep);
  color: white;
  border: 1px solid var(--color-deep);
  border-radius: 5px;

  font-size: large;

  &:hover {
    background-color: white;
    color: var(--color-deep);
  }
`;
