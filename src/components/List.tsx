import styled from "styled-components";

interface Props {
    title: string;
}

const Category = ({ title }: Props) => {
    return (
        <>
            <Container>
                {title}
            </Container>
        </>
    )
}

export default Category;

const Container = styled.div`
display: inline-block;
margin-right: 5px;
margin-bottom: 5px;
margin-top: 5px;
padding: 1px 3px;

background-color: #2A75F3;
color: white;
border-radius: 5px;
font-weight: 600;
font-size: large;
text-align: center;
`;