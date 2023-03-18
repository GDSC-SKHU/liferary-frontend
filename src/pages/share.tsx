import Nav from "@/components/Nav/Nav";
import ShareBody from "@/components/Share/ShareBody";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export interface ShareProps {
  id: string;
}

export default function Share({ id }: ShareProps) {
  return (
    <>
      <Nav />
      <ShareBody id={id} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ShareProps> = async (
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
