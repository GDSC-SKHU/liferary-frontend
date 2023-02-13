import styled from "styled-components";
import List from "../List";
import Satisfy from "./Satisfy";
import ShareForm from "./ShareForm";

export default function ShareBody() {
    return (
        <>
            <Category>
                <StyledSpan>Tag: </StyledSpan>
                <List title="cook" />
                {/* <StyledBtn>cook</StyledBtn> */}
            </Category>
            <ShareForm />
            <Satisfy />
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

const StyledBtn = styled.button`
background-color: #2A75F3;
color: white;
border: none;
border-radius: 5px;
font-weight: 600;
font-size: large;
`;
