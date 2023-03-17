import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Study from "./pages/study";

export interface QueryProps {
  id: string;
}

export default function Types({ id }: QueryProps) {
  return (
    <>
      <Study id={id} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<QueryProps> = async (
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
