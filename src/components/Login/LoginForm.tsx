import axios from "axios";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import {
  Container,
  StyledDiv,
  StyledForm,
  StyledInput,
} from "../Signup/SignupForm";
import { googleLogin } from "./GoogleLogin";

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
    <Container>
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
        <LoginBtn>
          <Submit type="submit">Login</Submit>
          <GoogleLogin onClick={handleGoogleLogin}>
            <Google src="/google.png" />
            <span style={{ fontSize: "13px" }}>Google Login</span>
          </GoogleLogin>
        </LoginBtn>
      </StyledForm>
    </Container>
  );
};

export default LoginForm;

const LoginBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Submit = styled.button`
  width: 19vw;
  margin-top: 3rem;
  padding: 3px 0;

  background-color: var(--color-main);
  color: white;
  border: 1px solid var(--color-main);
  border-radius: 5px;

  cursor: pointer;

  &:hover {
    color: var(--color-main);
    background-color: white;
  }
`;

const Google = styled.img`
  width: 1.5vw;
  margin-right: 10px;
  padding: 1px;

  cursor: pointer;
`;

const GoogleLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 19vw;
  margin-top: 1rem;
  padding: 3px 0;

  background-color: white;
  color: var(--color-main);
  border: 1px solid var(--color-main);
  border-radius: 5px;

  cursor: pointer;

  :hover {
    opacity: 0.7;
  }
`;
