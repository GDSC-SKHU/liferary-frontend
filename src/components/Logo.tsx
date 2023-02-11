import Link from "next/link";
import styled from "styled-components";

export default function Logo() {
    return (
        <div>
            <Link href={"/"}>
                <StyledImg src="/Logo.svg" />
            </Link>
        </div>
    )
}

const StyledImg = styled.img`
margin-top: 5vh;
margin-left: 3vw;
margin-right: 3vw;
`;