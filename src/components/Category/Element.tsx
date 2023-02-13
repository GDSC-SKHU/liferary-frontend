import Link from "next/link";
import styled from "styled-components";
import List from "../List";

export default function Element() {
    return (
        <>
            <Container>
                <StyledP2>food</StyledP2>
                <br />
                <Link href="/s_write">
                    <List title="cook" />
                </Link>
                <List title="baking" />
                <List title="menu" />
            </Container>
            <Container>
                <StyledP2>nonsense</StyledP2>
                <br />
                <List title="laugh" />
                <List title="happy" />
                <List title="emotions" />
                <List title="fillings" />
            </Container>
            <Container>
                <StyledP2>food</StyledP2>
                <br />
                <List title="cook" />
                <List title="baking" />
                <List title="menu" />
            </Container>
            <Container>
                <StyledP2>food</StyledP2>
                <br />
                <List title="cook" />
                <List title="baking" />
                <List title="menu" />
            </Container>
            <Container>
                <StyledP2>food</StyledP2>
                <br />
                <List title="cook" />
                <List title="baking" />
                <List title="menu" />
            </Container>
            <Container>
                <StyledP2>food</StyledP2>
                <br />
                <List title="cook" />
                <List title="baking" />
                <List title="menu" />
            </Container>
            <Container>
                <StyledP2>food</StyledP2>
                <br />
                <List title="cook" />
                <List title="baking" />
                <List title="menu" />
            </Container>
            <Container>
                <StyledP2>food</StyledP2>
                <br />
                <List title="cook" />
                <List title="baking" />
                <List title="menu" />
            </Container>
            <Container>
                <StyledP2>food</StyledP2>
                <br />
                <List title="cook" />
                <List title="baking" />
                <List title="menu" />
            </Container>
            <Container>
                <StyledP2>food</StyledP2>
                <br />
                <List title="cook" />
                <List title="baking" />
                <List title="menu" />
            </Container>
        </>
    )
}

const Container = styled.div`
float: left;
margin-right: 1rem;
margin-bottom: 10px;
`;

const StyledP2 = styled.span`
color: #4285F4;
font-weight: 700;
font-size: small;
`;
