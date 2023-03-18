import { GetServerSidePropsContext, GetServerSideProps } from "next";
import Nav from "@/components/Nav/Nav";
import CategoryBody from "@/components/Category/CategoryBody";
export interface CategoryParams {
  categoryName?: string;
}

const Detail = ({ categoryName }: CategoryParams) => {
  return (
    <>
      <Nav />
      <CategoryBody categoryName={categoryName} />
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

export default Detail;
