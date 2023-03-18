import { GetServerSidePropsContext, GetServerSideProps } from "next";
import Nav from "@/components/Nav/Nav";
import CategoryBody from "@/components/Category/CategoryBody";
import C_listBody from "@/components/C_list/C_listBody";
export interface CategoryParams {
  categoryName?: string;
}
export interface mainPostIdParams {
  mainPostId?: string;
}

const Detail = (
  { categoryName }: CategoryParams,
  { mainPostId }: mainPostIdParams
) => {
  return (
    <>
      <Nav />
      <CategoryBody categoryName={categoryName} />
      <C_listBody mainPostId={mainPostId} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  //ctx serversidecontext제공해준다.

  const categoryName = context.params!.name as unknown as CategoryParams;
  return {
    props: { categoryName },
  };
};

export const getServerSideProps2: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const mainPostId = context.params!.name as unknown as CategoryParams;
  return {
    props: { mainPostId },
  };
};

export default Detail;
