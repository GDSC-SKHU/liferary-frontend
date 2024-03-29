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
              <Element isOpen={false} categories={[]} />
            </ModalContainer>
          </Modal>
        )}
        choose here!
      </StyledBtn>
    </>
  );
}

const StyledBtn = styled.button`
  background-color: white;
  color: #bebebe;
  border: 1px solid var(--color-main);
  border-radius: 5px;

  font-weight: 600;
  font-size: large;
  cursor: pointer;
`;

const ModalContainer = styled.div`
  width: 50vw;

  background-color: var(--color-normal);
`;

const StyledDeleteBtn = styled.button`
  float: right;

  background-color: white;
  border: none;

  font-size: 1.5rem;
`;
