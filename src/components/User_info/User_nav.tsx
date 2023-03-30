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
  justify-content: center;
  align-items: center;

  width: 10vw;
  height: 100%;
  padding: 0.5rem;
`;

const UserNavWrapper = styled.div<{ isFocus: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 172%;
  height: 2rem;
  margin: 30px 0;

  color: #a1a1a1;
  border-left: 2px solid white;

  backdrop-filter: blur(2px);

  :hover {
    border-left: 2px solid #a1a1a1;

    cursor: pointer;
  }

  ${({ isFocus }) =>
    isFocus &&
    css`
      color: black;
      border-left: 2px solid black;

      font-weight: 600;

      cursor: pointer;
    `}
`;
