import Logo from "@/components/Logo";
import Link from "next/link";
import styled from "styled-components";

export default function Login() {
    return (
        <>
            <Container>
                <h2>Hi, We are Liferary.</h2>
                <StyledP>If you don't have an id,</StyledP>
                <StyledP>please sign up first.</StyledP>
                <StyledP>Thank you.</StyledP>
                <Link href={"/signup"}>
                    <StyledBtn>Sign up here</StyledBtn>
                </Link>
            </Container>
            <Logo />
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
    )
}

const Container = styled.div`
width: 40%;
height: 100vh;
float: right;

padding-top: 37vh;
padding-left: 12vw;

background-color: #72A4F7;
color: white;
`;

const StyledP = styled.p`
line-height: 200%;
`;

const StyledBtn = styled.button`
margin-left: 10vw;

background-color: #72A4F7;
color: white;
border: 1px solid white;
border-radius: 7px;

cursor: pointer;

&:hover {
    background-color: white;
    color: #72A4F7;
}
`;

const StyledForm = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

margin-top: 15vh;

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