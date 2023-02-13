import styled from "styled-components";
import CategoryBtn from "./CategoryBtn";
import S_writeForm from "./S_writeForm";

export default function S_writeBody() {
    return (
        <>
            <Category>
                <StyledSpan>Tag: </StyledSpan>
                <CategoryBtn />
            </Category>
            <S_writeForm />
        </>
    )
}

const Category = styled.div`
margin-top: 1rem;
`;

const StyledSpan = styled.span`
margin-left: 3vw;

color: #4285f4;
font-weight: 600;
font-size: large;
`;