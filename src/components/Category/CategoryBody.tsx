import Element from "./Element";
import styled from "styled-components";

export default function CategoryBody() {
    return (
        <>
            <Container>
                <Continer2>
                    <StyledDiv>
                        <StyledH2>Choose your category!</StyledH2>
                    </StyledDiv>
                    <StyledDiv2>
                        <Element />
                    </StyledDiv2>
                </Continer2>
            </Container>
        </>
    )
}

const Container = styled.div`
width: 100%;
height: 70vh;
margin-top: 4vh;
padding-top: 4vh;

background-color: #72a4f7;
color: white;
`;

const Continer2 = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

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
width: 60vw;
height: 50vh;
padding: 0.5rem 1rem;

background-color: white;
color: #72a4f7;
border-radius: 5px;
box-shadow: 5px 5px 20px #444444;
`;