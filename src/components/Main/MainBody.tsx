import Link from "next/link";
import styled from "styled-components";
import Card from "./Card";
import List from "../List";

export default function MainBody() {
    return (
        <>
            <Container>
                <Container3>
                    <h2>Hi, We are Liferary.</h2>
                    <StyledP>If you have any questions,</StyledP>
                    <StyledP>here is answer.</StyledP>
                    <StyledP>Because everything is here.</StyledP>
                </Container3>
                <Continer2>
                    <StyledDiv>
                        <StyledH2>Choose your category!</StyledH2>
                    </StyledDiv>
                    <StyledDiv2>
                        <StyledP2>food</StyledP2>
                        <List title="cook" />
                        <List title="baking" />
                        <List title="menu" />
                        <StyledP2>health</StyledP2>
                        <List title="exercise" />
                        <List title="hospital" />
                        <StyledP2>nonsense</StyledP2>
                        <List title="laugh" />
                        <List title="happy" />
                        <StyledBtn>click here!</StyledBtn>
                        <div>
                            <StyledP2>life</StyledP2>
                            <List title="tips" />
                            <List title="house" />
                            <Link href="/category">
                                <StyledSpan>Full View</StyledSpan>
                            </Link>
                        </div>
                    </StyledDiv2>
                </Continer2>
            </Container>
            <Card />
        </>
    )
}

const Container = styled.div`
width: 100%;
height: 70vh;
margin-top: 4vh;
padding-left: 14vw;

background-color: #72a4f7;
color: white;
`;

const StyledBtn = styled.button`
float: right;
margin-top: 5vh;

background-color: #A0C3FD;
color: white;
border: none;
border-radius: 5px;
font-weight: 500;
`;

const StyledSpan = styled.span`
float: right;

color: #4285F4;
border-bottom: 2px solid #4285F4;
font-size: large;
font-weight: 700;
`;

const StyledP2 = styled.p`
color: #4285F4;
font-weight: 700;
font-size: small;
`;

const Container3 = styled.div`
float: left;
margin-top: 22vh;
`;

const Continer2 = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
float: right;

margin-top: 8vh;
margin-right: 14vw;

color: white;
`;

const StyledDiv = styled.div`
width: 25vw;
height: 7vh;

margin-bottom: 1rem;

background-color: #A0C3FD;
border-radius: 10px;
text-align: center;

@media (max-width: 800px) {
width: 30vw;
height: auto;
padding: 3px;
}
`;

const StyledH2 = styled.h2`
@media (max-width: 800px) {
font-size: medium;
}
`;

const StyledDiv2 = styled.div`
width: 30vw;
height: 40vh;
padding: 0.5rem 1rem;

background-color: white;
color: #72a4f7;
border-radius: 5px;
box-shadow: 5px 5px 20px #444444;
`;

const StyledP = styled.p`
line-height: 200%;
`;