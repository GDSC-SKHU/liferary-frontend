import Nav from "@/components/Nav/Nav";
import S_editBody from "@/components/S_edit/S_editBody";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export interface UpdateProps {
  id: string;
}

export default function S_edit({ id }: UpdateProps) {
  return (
    <>
      <Nav />
      <S_editBody id={id} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<UpdateProps> = async (
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
