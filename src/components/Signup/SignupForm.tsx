import axios from 'axios';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

const SignupForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');

  const [username, setUserName] = useState<string>('');

  const [pw, setPw] = useState<string>('');

  // password 재입력
  const [rpw, setRpw] = useState<string>('');

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

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios // signup 링크
      .post('/signup', {
        email: email,
        username: username,
        password: pw,
        rpw: rpw,
      })
      .then((res) => {
        console.log(res.data);
        router.push('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Container2>
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
            <StyledDiv2>
              <StyledP2>Repeat</StyledP2>
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
      </Container2>
    </>
  );
};

export default SignupForm;

const Container2 = styled.div`
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

  margin-top: 20vh;

  color: #72a4f7;
`;

const StyledDiv = styled.div`
  padding-top: 2rem;
`;

const StyledDiv2 = styled.div`
  padding-top: 1.2rem;
`;

const StyledInput = styled.input`
  width: 15vw;
  margin-left: 1rem;
  float: right;

  outline: none;
  border: none;
  border-bottom: 1px solid #72a4f7;

  &:focus {
    border-bottom: 2px solid #72a4f7;
  }
`;

const StyledInput2 = styled.input`
  width: 15vw;
  margin-left: 1rem;
  float: right;

  outline: none;
  border: none;
  border-bottom: 1px solid #72a4f7;

  &:focus {
    border-bottom: 2px solid #72a4f7;
  }
`;

const Submit = styled.button`
  padding: 3px 7vw;
  margin-top: 3rem;

  background-color: #72a4f7;
  color: white;
  border: 1px solid #72a4f7;
  border-radius: 7px;

  cursor: pointer;

  &:hover {
    color: #72a4f7;
    background-color: white;
  }
`;

const StyledP2 = styled.p`
  font-size: x-small;
`;
