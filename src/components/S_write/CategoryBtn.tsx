import { useCallback, useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import Element from "../Category/Element";

export default function CategoryBtn() {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const onClickToggleModal = useCallback(() => {
        setOpenModal(!openModal);
    }, [openModal]);

    return (
        <>
            <StyledBtn onClick={onClickToggleModal}>
                {openModal && (
                    <Modal onClickToggleModal={onClickToggleModal}>
                        <ModalContainer>
                            <StyledDeleteBtn>x</StyledDeleteBtn>
                            <Element />
                        </ModalContainer>
                    </Modal>
                )}choose here!</StyledBtn>
        </>
    )
}

const StyledBtn = styled.button`
background-color: white;
color: #bebebe;
border: 1px solid #4285F4;
border-radius: 5px;
font-weight: 600;
font-size: large;
cursor: pointer;
`;

const ModalContainer = styled.div`
width: 50vw;
backgroud-color: #72a4f7;
`;

const StyledDeleteBtn = styled.button`
  float: right;
  
  font-size: 1.5rem;

  background-color: white;
  border: none;
`;