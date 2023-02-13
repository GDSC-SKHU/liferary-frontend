import Link from "next/link";
import styled from "styled-components";
import CreateStudy from "./CreateStudy";

export default function S_write() {
    return (
        <>
            <StyledForm>
                <StyledInput type="text" placeholder="Please enter your title" />
                <StyledInput2 type="text" placeholder="Write your tips contents" />
                <ImgInput type="file" accept="image/*" />
                <BtnContainer>
                    <CreateStudy />
                    <Submit>youtube</Submit>
                    <Link href="/share">
                        <Submit>registration</Submit>
                    </Link>
                </BtnContainer>
            </StyledForm>
        </>
    )
}

const StyledForm = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

color: white;
`;

const StyledInput = styled.input`
width: 40vw;
height: 6vh;
margin-top: 3vh;
padding: 0 6px;

outline: none;
border: 1px solid #4285F4;
border-radius: 5px;

&:focus {
    border: 2px solid #4285f4;
}

::placeholder {
    color: #bebebe;
    font-weight: 600;
    font-size: large;
}
`;

const StyledInput2 = styled.input`
width: 40vw;
height: 40vh;
margin-top: 3vh;
padding: 0 6px;

outline: none;
border: 1px solid #4285F4;
border-radius: 5px;

&:focus {
    border: 2px solid #4285f4;
}

::placeholder {
    color: #bebebe;
    font-weight: 600;
    font-size: large;
}
`;

const ImgInput = styled.input`
float: right;
margin-top: 3vh;
`;

const BtnContainer = styled.div`
display: flex;
justify-content: space-between;
width: 40vw;
margin-top: 5vh;
`;

const Submit = styled.button`
padding: 3px 10px;

background-color: #72A4F7;
color: white;
border: 1px solid #72a4f7;
border-radius: 10px;
font-weight: 600;
font-size: large;
cursor: pointer;

&:hover {
    background-color: white;
    color: #72a4f7;
    border: 1px solid #72a4f7;
}
`;