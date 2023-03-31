import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";

const SignupForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");

  const [username, setUserName] = useState<string>("");

  const [pw, setPw] = useState<string>("");

  const [error, setError] = useState("");

  // password 재입력
  const [rpw, setRpw] = useState<string>("");

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const onChangePw = (e: ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const onChangeRPw = (e: ChangeEvent<HTMLInputElement>) => {
    setRpw(e.target.value);
  };

  const errorAlert = () => {
    if (pw != rpw) {
      return alert("Passwords do not match");
    } else {
    }
  };

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(
      pw
    );

    if (!isValid) {
      setError("Password is not valid");
      alert("Special characters, numbers must be included");
      return;
    }

    axios // signup 링크
      .post("/api/member/join", {
        email: email,
        nickname: username,
        password: pw,
        checkedPassword: rpw,
      })
      .then((res) => {
        console.log(res.data);
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
        errorAlert();
      });
  };

  return (
    <>
      <Container>
        <StyledForm onSubmit={onSubmit}>
          <h2>SIGN UP</h2>
          <div>
            <StyledDiv>
              <span>email</span>
              <StyledInput type="text" value={email} onChange={onChangeEmail} />
            </StyledDiv>
            <StyledDiv>
              <span>Username</span>
              <StyledInput
                type="text"
                value={username}
                onChange={onChangeName}
              />
            </StyledDiv>
            <StyledDiv>
              <span>Password</span>
              <StyledInput type="password" value={pw} onChange={onChangePw} />
            </StyledDiv>
            {error && (
              <div
                style={{ marginTop: "2px", color: "red", fontSize: "small" }}
              >
                {error}
              </div>
            )}
            <StyledDiv2>
              <StyledP>Repeat</StyledP>
              <span>Password</span>
              <StyledInput2
                type="password"
                value={rpw}
                onChange={onChangeRPw}
              />
            </StyledDiv2>
          </div>
          <Submit type="submit">Sign up</Submit>
        </StyledForm>
      </Container>
    </>
  );
};

export default SignupForm;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: default;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 20vh;

  color: var(--color-main);

  @media (max-width: 800px) {
    margin-top: 21vh;
  }
`;

export const StyledDiv = styled.div`
  padding-top: 2rem;
`;

const StyledDiv2 = styled.div`
  padding-top: 1.2rem;
`;

export const StyledInput = styled.input`
  width: 15vw;
  margin-left: 1rem;
  float: right;

  border: none;
  border-bottom: 1px solid var(--color-main);

  outline: none;

  &:focus {
    border-bottom: 2px solid var(--color-main);
  }
`;

const StyledInput2 = styled.input`
  width: 15vw;
  margin-left: 1rem;
  float: right;

  border: none;
  border-bottom: 1px solid var(--color-main);

  outline: none;

  &:focus {
    border-bottom: 2px solid var(--color-main);
  }
`;

const Submit = styled.button`
  padding: 3px 7vw;
  margin-top: 3rem;

  background-color: var(--color-main);
  color: white;
  border: 1px solid var(--color-main);
  border-radius: 7px;

  cursor: pointer;

  &:hover {
    background-color: white;
    color: var(--color-main);
  }
`;

const StyledP = styled.p`
  font-size: x-small;
`;
