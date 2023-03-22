import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Nav from "@/components/Nav/Nav";
import CommunityForm from "@/components/Community/CommunityForm";

export interface CommunityProps {
  mainPostId: string;
  id: string;
}

const CommunityDetail = ({ mainPostId, id }: CommunityProps) => {
  return (
    <>
      <Nav />
      <CommunityForm mainPostId={mainPostId} id={id} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<CommunityProps> = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;

  const mainPostId = query.mainPostId as string;
  const id = query.id as string;

  return {
    props: {
      mainPostId,
      id,
    },
  };
};

export default CommunityDetail;
