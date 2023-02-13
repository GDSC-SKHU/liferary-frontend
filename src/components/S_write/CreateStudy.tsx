import { useCallback, useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

export default function CreteStudy() {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const onClickToggleModal = useCallback(() => {
        setOpenModal(!openModal);
    }, [openModal]);

    return (
        <>
            <Submit onClick={onClickToggleModal}>
                {openModal && (
                    <Modal onClickToggleModal={onClickToggleModal}>
                        <ModalContainer>
                            <StyledDeleteBtn>x</StyledDeleteBtn>
                            <form>
                                <StyledInput type="text" placeholder="Please enter your title" />
                                <StyledInput2 type="text" placeholder="Write your tips contents" />
                                <Submit>registration</Submit>
                            </form>
                        </ModalContainer>
                    </Modal>
                )}create study</Submit>
        </>
    )
}

const StyledDeleteBtn = styled.button`
  float: right;
  
  font-size: 1.5rem;

  background-color: white;
  border: none;
`;

const ModalContainer = styled.div`
width: 50vw;
backgroud-color: #72a4f7;
`;

const StyledInput = styled.input`
width: 40vw;
height: 6vh;
margin-top: 3vh;
padding: 0 6px;

outline: none;
border: 1px solid #4285F4;
border-radius: 5px;

&:focus {
    border: 2px solid #4285f4;
}

::placeholder {
    color: #bebebe;
    font-weight: 600;
    font-size: large;
}
`;

const StyledInput2 = styled.input`
width: 40vw;
height: 40vh;
margin-top: 3vh;
padding: 0 6px;

outline: none;
border: 1px solid #4285F4;
border-radius: 5px;

&:focus {
    border: 2px solid #4285f4;
}

::placeholder {
    color: #bebebe;
    font-weight: 600;
    font-size: large;
}
`;

const Submit = styled.button`
padding: 3px 10px;

background-color: #72A4F7;
color: white;
border: 1px solid #72a4f7;
border-radius: 10px;
font-weight: 600;
font-size: large;
cursor: pointer;

&:hover {
    background-color: white;
    color: #72a4f7;
    border: 1px solid #72a4f7;
}
`;