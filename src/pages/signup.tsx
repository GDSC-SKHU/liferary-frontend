import Logo from "@/components/Logo";
import Link from "next/link";
import styled from "styled-components";

export default function Signup() {
    return (
        <div>
            <Container>
                <h2>Hi, We are Liferary.</h2>
                <StyledP>If you have an id,</StyledP>
                <StyledP>please login.</StyledP>
                <StyledP>Thank you.</StyledP>
                <Link href={"/login"}>
                    <StyledBtn>Login here</StyledBtn>
                </Link>
            </Container>
            <Logo />
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
                    <Submit>Sign up</Submit>
                </StyledForm>
            </Container2>
        </div>
    )
}

const Container = styled.div`
width: 40%;
height: 100vh;
float: left;

padding-top: 37vh;
padding-left: 11vw;

background-color: #72A4F7;
color: white;
`;

const Container2 = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
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

margin-top: 8vh;

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