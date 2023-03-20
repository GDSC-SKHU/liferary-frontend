import Nav from "@/components/Nav/Nav";
import CommunityBody from "@/components/Community/CommunityBody";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export interface CommunityProps {
  id: string;
}

export default function Community({ id }: CommunityProps) {
  return (
    <>
      <Nav />
      <CommunityBody />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<CommunityProps> = async (
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
