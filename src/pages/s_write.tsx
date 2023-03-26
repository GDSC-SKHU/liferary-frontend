import Nav from "@/components/Nav/Nav";
import S_writeBody from "@/components/S_write/S_writeBody";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export interface MainCategoryProps {
  currentCategory: string | null;
}

export default function S_write({ currentCategory }: MainCategoryProps) {
  return (
    <>
      <Nav />
      <S_writeBody currentCategory={currentCategory} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<MainCategoryProps> = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;

  const currentCategory = (query.category as string) || null;

  return {
    props: {
      currentCategory,
    },
  };
};
