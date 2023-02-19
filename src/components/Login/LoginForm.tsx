import instance from '@/libs/api';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';

const LoginForm = () => {
  instance;
  const router = useRouter();

  const [emailData, setEmailData] = useState<string>('');

  const [pwData, setPwData] = useState<string>('');

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailData(e.target.value);
  };

  const onChangePw = (e: ChangeEvent<HTMLInputElement>) => {
    setPwData(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailData === '' || pwData === '') {
      alert('Please check your e-mail and password.');
    } else {
      axios // login 링크
        .post(
          '/login',
          {
            email: emailData,
            password: pwData,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data);
          // console.log(res.data.data.accessToken);
          // localStorage.setItem('accessToken', res.data.data.accessToken);

          router.push('/');
        })
        .catch((e) => {
          console.log(e);
          alert('Please enter the correct e-mail or password.');
        });
    }
  };

  return (
    <>
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
    </>
  );
};

export default LoginForm;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 18vh;

  color: #72a4f7;
`;

const StyledDiv = styled.div`
  padding-top: 2rem;
`;

const StyledInput = styled.input`
  width: 15vw;
  float: right;
  margin-left: 1rem;

  outline: none;
  border: none;
  border-bottom: 1px solid #72a4f7;

  &:focus {
    border-bottom: 2px solid #72a4f7;
  }
`;

const Submit = styled.button`
  margin-top: 3rem;
  padding: 3px 7vw;

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
