import React, { PropsWithChildren } from "react";
import styled from "styled-components";

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

export default function Modal({
  onClickToggleModal,
  children,
}: PropsWithChildren<ModalDefaultType>) {
  return (
    <ModalContainer>
      <DialogBox>{children}</DialogBox>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  position: fixed;
  top: 5rem;
  left: 5rem;
`;

const DialogBox = styled.dialog`
  width: 55vw;
  height: 55vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 5px 5px 5px gray;
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 1;
`;