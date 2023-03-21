import React from "react";
import styled, { css } from "styled-components";

type userItem = "Profile" | "Knowledge" | "Study" | "Community";
const User_nav = ({
  currentNav,
  handleNavChange,
}: {
  currentNav: userItem;
  handleNavChange: (kind: userItem) => void;
}) => {
  return (
    <UserNavContainer>
      <UserNavWrapper
        isFocus={currentNav === "Profile"}
        onClick={() => {
          handleNavChange("Profile");
        }}
      >
        Profile
      </UserNavWrapper>
      <UserNavWrapper
        isFocus={currentNav === "Knowledge"}
        onClick={() => {
          handleNavChange("Knowledge");
        }}
      >
        Knowledge
      </UserNavWrapper>
      <UserNavWrapper
        isFocus={currentNav === "Study"}
        onClick={() => {
          handleNavChange("Study");
        }}
      >
        Study
      </UserNavWrapper>
      <UserNavWrapper
        isFocus={currentNav === "Community"}
        onClick={() => {
          handleNavChange("Community");
        }}
      >
        Community
      </UserNavWrapper>
    </UserNavContainer>
  );
};

export default User_nav;

const UserNavContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 10vw;
  height: 100%;
  padding: 2rem 0.5rem;
`;

const UserNavWrapper = styled.div<{ isFocus: boolean }>`
  margin: 20px 0;
  width: 100%;
  height: 2rem;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: scale 0.5 ease-in-out;
  :hover {
    background: var(--color-light);
    cursor: pointer;
    transform: scale(1.2);
    color: white;
    /* transition: all 0.5 ease-in-out; */
  }
  ${({ isFocus }) =>
    isFocus &&
    css`
      color: var(--color-deep);
      cursor: pointer;
      transform: scale(1);
      box-shadow: 0 2px 5px var(--color-main);
      /* transition: all 0.5 ease-in-out; */
    `}
`;
