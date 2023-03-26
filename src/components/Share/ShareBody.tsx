import styled from "styled-components";
import ShareForm from "./ShareForm";
import { ShareProps } from "@/pages/share";
import Recruit from "./Recruit";
import Community from "./Community";
import { useEffect, useState } from "react";

export default function ShareBody({ id }: ShareProps) {
  const [study, setStudy] = useState(false);

  useEffect(() => {
    const isStudy = localStorage.getItem("study");
    if (isStudy !== null) {
      setStudy(isStudy === "true");
    }
  }, []);

  // const toggleStudy = () => {
  //   setStudy((prevStudy) => !prevStudy);
  //   localStorage.setItem("isStudy", (!study).toString());
  // };

  return (
    <>
      <ShareForm id={id} />
      <Container>
        {study && <Recruit />}
        <Recruit />
        <Community id={id} />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 0 23vw;
`;
