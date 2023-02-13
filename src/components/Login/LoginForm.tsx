import styled from 'styled-components';

export default function LoginForm() {
  return (
    <>
      <StyledForm>
        <h2>LOGIN</h2>
        <div>
          <StyledDiv>
            <span>Username</span>
            <StyledInput type="text" />
          </StyledDiv>
          <StyledDiv>
            <span>Password</span>
            <StyledInput type="password" />
          </StyledDiv>
        </div>
        <Submit>Login</Submit>
      </StyledForm>
    </>
  );
}

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
