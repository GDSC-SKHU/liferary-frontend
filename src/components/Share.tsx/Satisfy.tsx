import styled from "styled-components";

export default function Satisfy() {
    return (
        <>
            <Container>
                <StyledDiv>
                    <StyledH2>How was our service?</StyledH2>
                </StyledDiv>
                <Container2>
                    <StyledBtn>Excellent</StyledBtn>
                    <StyledBtn>Bad</StyledBtn>
                </Container2>
            </Container>
        </>
    )
}

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

margin-bottom: 2rem;

color: white;
`;

const Container2 = styled.div`
display: flex;
justify-content: space-between;
padding: 1rem 2rem;

width: 30vw;
height: 30vh;

background-color: white;
color: #4285F4;
border-radius: 10px;
box-shadow: 2px 2px 5px #333333;

@media (max-width: 800px) {
    width: 30vw;
    padding: 3px;
    }
`;

const StyledBtn = styled.button`
width: 
`;

const StyledDiv = styled.div`
width: 22vw;
height: 7vh;

margin-bottom: 1rem;

background-color: #A0C3FD;
border-radius: 5px;
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