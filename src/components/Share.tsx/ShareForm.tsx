import styled from "styled-components";

export default function ShareForm() {
    return (
        <>
            <Container>
                <StyledDiv>
                    <StyledH2>Title</StyledH2>
                </StyledDiv>
                <StyledDiv2>
                    <StyledSpan>Lorem Ipsum is simply dummy text of
                        the printing and typesetting industry.</StyledSpan>
                </StyledDiv2>
            </Container>
        </>
    )
}

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

color: white;
`;

const StyledDiv = styled.div`
width: 40vw;
height: 7vh;

margin-bottom: 1rem;

background-color: #72A4F7;
border-radius: 10px;
text-align: center;

@media (max-width: 800px) {
width: 30vw;
height: auto;
padding: 3px;
}
`;

const StyledDiv2 = styled.div`
width: 40vw;
height: 40vh;

margin-bottom: 1rem;

background-color: white;
border-radius: 10px;

text-align: justify;

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

const StyledSpan = styled.span`
color: #4285F4;
font-weight: 500;
font-size: 1.4rem;


@media (max-width: 800px) {
font-size: medium;
}
`;