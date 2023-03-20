import { GetServerSidePropsContext, GetServerSideProps } from "next";
import Nav from "@/components/Nav/Nav";
import C_listBody from "@/components/C_list/C_listBody";

export interface mainPostIdParams {
  mainPostId?: string;
}

const Detail = ({ mainPostId }: mainPostIdParams) => {
  return (
    <>
      <Nav />
      <C_listBody mainPostId={mainPostId} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  //ctx serversidecontext제공해준다.

  const mainPostId = context.params!.name as unknown as mainPostIdParams;
  return {
    props: { mainPostId },
  };
};

export default Detail;
