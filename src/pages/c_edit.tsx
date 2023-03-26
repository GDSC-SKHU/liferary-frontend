import C_editBody from "@/components/C_edit/C_editBody";
import Nav from "@/components/Nav/Nav";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";

export interface CommunityUpdateProps {
  mainPostId: string;
  id: string;
}

const CommunityEdit = () => {
  return (
    <>
      <Nav />
      <C_editBody />
    </>
  );
};

export default CommunityEdit;

export const getServerSideProps: GetServerSideProps<
  CommunityUpdateProps
> = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  const id = query.id as string;
  const mainPostId = query.mainPostId as string;
  return {
    props: {
      mainPostId,
      id,
    },
  };
};
