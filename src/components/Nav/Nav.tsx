import Link from "next/link";
import styled from "styled-components";

export default function Nav() {
    return (
        <>
            <Container>
                <Link href={"/"}>
                    <StyledImg src="/Logo.svg" />
                </Link>
                <Search placeholder="Liferary" />
                <StyledSpan>Welcome!</StyledSpan>
                <Link href={"/login"}>
                    <StyledImg2 src="/Pro.svg" alt="" />
                </Link>
            </Container>
        </>
    )
}

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`;

const StyledSpan = styled.span`
margin-top: 3vh;

color: #72A4F7;
font-weight: 600;
`;

const StyledImg = styled.img`
width: 18vw;
height: auto;

margin-top: 1vh;
margin-left: 3vw;
padding-top: 1rem;
`;

const Search = styled.input`
background-image: url(/Mag.svg);
background-repeat: no-repeat;
background-position: 10px;

width: 50vw;
height: 7vh;
margin-top: 3vh;
padding: 5px 10px;
padding-left: 2.5rem;

outline: none;
background-color: white;
border: 2px solid #72a4f7;
border-radius: 2rem;
box-shadow: 2px 2px 5px;
`;

const StyledImg2 = styled.img`
margin-top: 3vh;
margin-right: 3vw;
`;
