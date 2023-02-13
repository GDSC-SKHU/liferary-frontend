import Link from 'next/link';
import styled from 'styled-components';

export default function SignupForm() {
  return (
    <>
      <Container2>
        <StyledForm>
          <h2>SIGN UP</h2>
          <div>
            <StyledDiv>
              <span>email</span>
              <StyledInput type="text" />
            </StyledDiv>
            <StyledDiv>
              <span>Username</span>
              <StyledInput type="text" />
            </StyledDiv>
            <StyledDiv>
              <span>Password</span>
              <StyledInput type="password" />
            </StyledDiv>
            <StyledDiv2>
              <StyledP2>Repeat</StyledP2>
              <span>Password</span>
              <StyledInput2 type="password" />
            </StyledDiv2>
          </div>
          <Link href="/login">
            <Submit>Sign up</Submit>
          </Link>
        </StyledForm>
      </Container2>
    </>
  );
}

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
