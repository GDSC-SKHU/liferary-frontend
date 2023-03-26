import axios from "axios";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { googleLogin } from "./GoogleLogin";
import useToken from "../../hooks/useToken";

const LoginForm = () => {
  const [emailData, setEmailData] = useState<string>("");

  const [pwData, setPwData] = useState<string>("");

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailData(e.target.value);
  };

  const onChangePw = (e: ChangeEvent<HTMLInputElement>) => {
    setPwData(e.target.value);
  };

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailData === "" || pwData === "") {
      alert("Please check your e-mail and password.");
    }
    axios // login 링크
      .post("/api/member/login", {
        email: emailData,
        password: pwData,
      })
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        // if (!!res.data) {
        //   setAccessToken(res.data.accessToken);
        //   setUserEmail(emailData);
        // }
        axios
          .get("/api/member/info", {
            //이건필수
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((res) => {
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            location.href = "/"; //새로고침하면서 페이지 이동
          });
      })
      .catch((e) => {
        console.log(e);
        alert("Please enter the correct e-mail or password.");
      });
  };

  const handleGoogleLogin = async () => {
    await googleLogin();
  };

  return (
    <LoginFormWrapper>
      <StyledForm onSubmit={onSubmit}>
        <h2>LOGIN</h2>
        <div>
          <StyledDiv>
            <span>Username</span>
            <StyledInput
              type="text"
              value={emailData}
              onChange={onChangeEmail}
            />
          </StyledDiv>
          <StyledDiv>
            <span>Password</span>
            <StyledInput type="password" value={pwData} onChange={onChangePw} />
          </StyledDiv>
        </div>
        <Submit type="submit">Login</Submit>
      </StyledForm>
      <Submit onClick={handleGoogleLogin}>Google Login</Submit>
    </LoginFormWrapper>
  );
};

export default LoginForm;

const LoginFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 18vh;

  color: var(--color-normal);

  @media (max-width: 800px) {
    margin-top: 23vh;
  }
`;

const StyledDiv = styled.div`
  padding-top: 2rem;
`;

const StyledInput = styled.input`
  width: 15vw;
  float: right;
  margin-left: 1rem;

  border: none;
  border-bottom: 1px solid var(--color-normal);

  outline: none;

  &:focus {
    border-bottom: 2px solid var(--color-normal);
  }
`;

const Submit = styled.button`
  width: 20vw;
  margin-top: 3rem;
  padding: 3px 7vw;

  background-color: var(--color-normal);
  color: white;
  border: 1px solid var(--color-normal);
  border-radius: 7px;

  cursor: pointer;

  &:hover {
    color: var(--color-normal);
    background-color: white;
  }
`;
