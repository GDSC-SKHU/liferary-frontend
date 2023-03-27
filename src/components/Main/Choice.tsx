import { categoryList } from "@/types/category";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

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
        <BannerWrapper>
          <h2>Hi, We are Liferary.</h2>
          <p>If you have any questions,</p>
          <p>here is answer.</p>
          <p>Because everything is here.</p>
        </BannerWrapper>
        <BannerWrapper>
          <h4>What kind of knowledge do you want to know?</h4>
          <BannerCategoryWrapper>
            {categoryList.map((el) => {
              return (
                <p
                  key={el}
                  onClick={() => {
                    router.push(`/category/${el}`);
                  }}
                >
                  {el}
                </p>
              );
            })}
          </BannerCategoryWrapper>
        </BannerWrapper>
      </BannerContainer>
      {userInfo ? (
        <WriteWrapper>
          <p>Please share your knowledge!</p>
          <Link href="/s_write">
            <WriteBtn>Share now!</WriteBtn>
          </Link>
        </WriteWrapper>
      ) : null}
      {/* <Link href="/s_write">
        <WriteBtn isHide={isHide}>Let's go write!</WriteBtn>
      </Link> */}
    </>
  );
};

export default Choice;

const BannerContainer = styled.div`
  display: flex;
  justify-content: space-around;

  padding: 1.5rem;

  background: var(--color-main);
  color: white;
`;

const BannerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 70vh;

  > h2 {
    margin-bottom: 5px;
  }

  > p {
    padding: 3px 0;
  }
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
    margin: 2px;

    border: 1px solid var(--color-light);
    border-radius: 20px;

    :hover {
      background-color: white;
      color: var(--color-deep);
    }
  }
`;

const WriteWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 4vh 3vw 0 0;
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
