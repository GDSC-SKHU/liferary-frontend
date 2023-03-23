import Nav from "@/components/Nav/Nav";
import St_editForm from "@/components/St_edit/St_editForm";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export interface UpdateProps {
  id: string;
}

export default function St_edit({ id }: UpdateProps) {
  return (
    <>
      <Nav />
      <St_editForm id={id} />
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
