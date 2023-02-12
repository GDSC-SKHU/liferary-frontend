import Link from "next/link";
import styled from "styled-components";

export default function Nav() {
    return (
        <div>
            <Link href={"/"}>
                <StyledImg src="/Logo.svg" />
            </Link>
            <Search placeholder="Liferary" />
        </div>
    )
}

const StyledImg = styled.img`
margin-left: 3vw;
padding-top: 1rem;
`;

const Search = styled.input`
background-image: url(/Mag.svg);
background-repeat: no-repeat;
background-position: 10px;

width: 50vw;
height: 7vh;
padding: 5px 10px;
padding-left: 2.5rem;

outline: none;
background-color: white;
border: 2px solid #72a4f7;
border-radius: 2rem;
box-shadow: 2px 2px 5px;
`;