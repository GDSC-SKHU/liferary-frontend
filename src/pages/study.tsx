import Nav from "@/components/Nav/Nav";
import StudyBody from "@/components/Study/StudyBody";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export interface StudyProps {
  id: string;
}

export default function Study() {
  return (
    <>
      <Nav />
      <StudyBody />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<StudyProps> = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;

  const id = query.id as string;

  return {
    props: {
      id,
    },
  };
};
