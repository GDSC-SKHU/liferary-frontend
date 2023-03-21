import styled from "styled-components";
import User_infoForm from "./User_infoForm";
import User_nav from "./User_nav";
import { useState } from "react";
import { User_post } from "./User_post";

export default function User_info() {
  type userItem = "Profile" | "Knowledge" | "Study" | "Community";

  const [currentNav, setCurrentNav] = useState<userItem>("Profile");

  const handleNavChange = (kind: userItem) => {
    setCurrentNav(kind);
  };

  return (
    <UserContainer>
      <UserWrapper>
        <User_nav handleNavChange={handleNavChange} currentNav={currentNav} />
      </UserWrapper>
      <UserWrapper>
        {(() => {
          switch (currentNav) {
            case "Profile":
              return <User_infoForm />;
            case "Knowledge":
            case "Study":
            case "Community":
              return <User_post kind={currentNav} />;

            default:
              return null;
          }
        })()}
      </UserWrapper>
    </UserContainer>
  );
}

const UserContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 15vw 65vw;

  height: 80vh;
`;

const UserWrapper = styled.div`
  display: flex;

  margin-left: 3rem;

  border-radius: 20px;

  box-shadow: 2px 2px 4px 0px var(--color-light);
  opacity: 0.5;
`;
